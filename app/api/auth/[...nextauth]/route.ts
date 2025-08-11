// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("Environment variables:", {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Authorize: Missing email or password");
          throw new Error("Email and password are required");
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
          console.error("Authorize: NEXT_PUBLIC_BACKEND_URL is undefined");
          throw new Error("Backend URL is not configured");
        }

        try {
          const res = await fetch(`${backendUrl}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            cache: "no-store",
          });

          const user = await res.json();
          console.log("Authorize: API response", {
            status: res.status,
            user,
            url: backendUrl,
          });

          if (!res.ok) {
            console.error("Authorize: API error", user.error || "Unknown error");
            throw new Error(user.error || "Invalid email or password");
          }

          if (!user?.jwt || !user?.id) {
            console.error("Authorize: Invalid response format", user);
            throw new Error("Invalid response format from server");
          }

          console.log("Authorize: Returning user", {
            id: user.id,
            email: credentials.email,
            jwt: user.jwt,
          });
          return {
            id: user.id,
            email: credentials.email,
            jwt: user.jwt,
          };
        } catch (error) {
          console.error("Authorize: Exception", error);
          throw new Error(error instanceof Error ? error.message : "Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.jwt = user.jwt;
        console.log("JWT callback: Token updated", token);
      }
      return token;
    },
async session({ session, token }) {
  console.log("Session callback: Input token", token);

  session.user = {
    ...session.user,
    id: token.id as string,
    email: token.email as string,
  };

  session.accessToken = token.jwt as string; // 🔥 Add token at top level for easy access

  console.log("Session callback: Session updated", session);
  return session;
}

  },
  pages: {
    signIn: "/admin/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 60 * 60 * 24, // Update every day
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };