import type { GetServerSideProps, GetServerSidePropsContext } from "next";
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth";
import { AUTH_ROUTES, authOptions } from "../pages/api/auth/[...nextauth]";
import { env } from "../env/server.mjs";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

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
