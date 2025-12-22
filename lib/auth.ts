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
        console.log('--- Auth Attempt Diagnostics ---');
        console.log('Email:', credentials?.email);
        console.log('BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL ? 'Set' : 'MISSING');
        console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'MISSING');
        console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not explicitly set (Next.js will try to infer)');

        if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
          console.error('CRITICAL: NEXT_PUBLIC_BACKEND_URL is not defined');
          throw new Error("Server configuration error: Backend URL is missing");
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        try {
          const loginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`;
          console.log('Attempting fetch to:', loginUrl);

          const res = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });

          // Handle non-JSON or error responses gracefully
          let user;
          try {
            user = await res.json();
          } catch (e) {
            console.error('Failed to parse response JSON:', e);
            throw new Error("Invalid response from authentication server");
          }

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

          console.log('Authentication failed:', user?.error || 'Unknown error');
          throw new Error(user?.error || "Invalid credentials");
        } catch (error: any) {
          console.error("Authentication error details:", error);
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
      session.accessToken = token.jwt as string;
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