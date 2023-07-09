import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
// import { type Session } from "next-auth";

// import { getServerAuthSession } from "../common/get-server-auth-session";
import { prisma } from "../db/client";
import { getAuth } from '@clerk/nextjs/server'
import type { SignedInAuthObject,SignedOutAuthObject } from "@clerk/nextjs/server";

type CreateContextOptions = {
  session: SignedInAuthObject | SignedOutAuthObject | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req } = opts;
  let session = null
  // try {
    session = getAuth(req)
    console.log("🚀 ~ file: context.ts:35 ~ createContext ~ session:", session)
  // } catch (error) {
  // }
  // Get the session from the server using the unstable_getServerSession wrapper function
  // const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
