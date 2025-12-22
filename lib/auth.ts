import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getBackendUrl } from "./utils";
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
        console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'MISSING');
        console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not explicitly set (Next.js will try to infer)');

        const backendUrl = getBackendUrl();
        console.log('Using BACKEND_URL:', backendUrl);

        if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
          console.warn('WARNING: NEXT_PUBLIC_BACKEND_URL is not defined, using fallback:', backendUrl);
        }

        if (!process.env.NEXTAUTH_SECRET) {
          console.error('CRITICAL: NEXTAUTH_SECRET is not defined in production');
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        try {
          const loginUrl = `${backendUrl}/api/login`;
          console.log('Attempting fetch to:', loginUrl);

          const res = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });

          console.log('Response status:', res.status, res.statusText);

          // Handle non-JSON or error responses gracefully
          let data;
          const text = await res.text();
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('Failed to parse response JSON. Raw text:', text);
            throw new Error(`Invalid response from backend (${res.status})`);
          }

          if (res.ok && data) {
            console.log('Authentication successful through backend API');
            return {
              id: data.id || data._id,
              email: data.email,
              username: data.username,
              role: data.role,
              jwt: data.jwt, // Store the token
            };
          }

          console.log('Authentication failed:', data?.error || 'Unknown error');
          throw new Error(data?.error || "Invalid credentials");
        } catch (error: any) {
          console.error("Authentication error details:", error);
          if (error.name === 'AbortError') {
            throw new Error("Authentication request timed out");
          }
          if (error.code === 'ECONNREFUSED' || error.message.includes('fetch')) {
            throw new Error("Could not connect to authentication server. Please check BACKEND_URL.");
          }
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
    signIn: "/admin/signin",
    error: "/admin/error", // Redirect to custom error page for better debugging
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode for more detailed logs in Vercel
};

// Log environment status at startup (only on server side)
if (typeof window === "undefined") {
  console.log("--- NextAuth Environment Check ---");
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "SET (Length: " + process.env.NEXTAUTH_SECRET.length + ")" : "MISSING ❌");
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL || "MISSING ❌");
  console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL || "MISSING (Using Fallback)");
  console.log("----------------------------------");
}