import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
    };
    jwt: string;
  }

  interface User {
    id: string;
    email: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    jwt: string;
  }
} 