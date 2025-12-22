import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Direct DB imports removed as we now use the backend API

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
          throw new Error("Please enter an email and password");
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });

          const user = await res.json();

          if (res.ok && user) {
            console.log('Authentication successful through backend API');
            return {
              id: user.id || user._id,
              email: user.email,
              username: user.username,
              role: user.role,
              jwt: user.jwt, // Store the token
            };
          }

          throw new Error(user.error || "Invalid credentials");
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
        token.jwt = user.jwt; // Store backend JWT in token
      }
      return token;
    },
    async session({ session, token }) {
      // Use the actual backend JWT as the access token
      session.accessToken = token.jwt;
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
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