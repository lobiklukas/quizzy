import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { env } from "../env/server.mjs";
import { AUTH_ROUTES } from "../pages/api/auth/[...nextauth]";
import { getAuth } from "@clerk/nextjs/server";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    console.log("🚀 ~ file: middleware.ts:21 ~ ctx.req:", ctx.req)
    const session = await getAuth(
      ctx.req,
    );
    console.log("🚀 ~ file: middleware.ts:22 ~ session:", session)

    if (!session && env.DISABLE_AUTH !== "1") {
      return {
        redirect: {
          destination: AUTH_ROUTES.signIn,
          permanent: false,
        },
      };
    }

    return func(ctx);
  };
