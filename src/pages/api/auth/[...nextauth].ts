import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const AUTH_ROUTES = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  verifyRequest: "/auth/verify-request",
  newUser: "/auth/new-user",
};

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  pages: AUTH_ROUTES,
  callbacks: {
    session({ session, user }) {
      console.log(
        "🚀 ~ file: [...nextauth].ts:21 ~ session ~ session",
        session
      );
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
