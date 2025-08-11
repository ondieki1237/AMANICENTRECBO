// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Debug environment variables
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Authorize: Starting with credentials", {
          email: credentials?.email,
        });

        if (!credentials?.email || !credentials?.password) {
          console.error("Authorize: Missing email or password");
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Add if backend requires an API key
                // "Authorization": `Bearer ${process.env.API_KEY}`,
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              cache: "no-store",
            }
          );

          const user = await res.json();
          console.log("Authorize: API response", {
            status: res.status,
            user,
            url: process.env.NEXT_PUBLIC_BACKEND_URL,
          });

          if (!res.ok) {
            console.error("Authorize: API error", user.error || "Unknown error");
            throw new Error(user.error || "Authentication failed");
          }

          if (!user?.jwt || !user?.id) {
            console.error("Authorize: Invalid response format", user);
            throw new Error("Invalid response format from server");
          }

          return {
            id: user.id,
            email: credentials.email,
            jwt: user.jwt,
          };
        } catch (error) {
          console.error("Authorize: Exception", error.message);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
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
      }
      return token;
    },
    async session({ session, token }) {
       session.accessToken = token.jwt;
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.jwt = token.jwt;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/signin",
    error: "/admin/error", // Added error page for better UX
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 60 * 60 * 24, // Update every day
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
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