import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/backend/models/User"; // Change to default import

import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Auth attempt with email:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials:', { 
            hasEmail: !!credentials?.email, 
            hasPassword: !!credentials?.password 
          });
          throw new Error("Please enter an email and password");
        }

        try {
          console.log('Connecting to database...');
          await connectDB();
          console.log('Database connected successfully');

          console.log('Searching for user with email:', credentials.email.toLowerCase());
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          console.log('User found:', !!user);

          if (!user) {
            throw new Error("No user found with this email");
          }

          console.log('Comparing passwords...');
          const isPasswordValid = await user.comparePassword(credentials.password);
          console.log('Password valid:', isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          console.log('Authentication successful');
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
       session.accessToken = token.jwt;
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
};