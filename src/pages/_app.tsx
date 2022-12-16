import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { ThemeSwitch } from "../components/ThemeSwitch";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div>
        <div className="mt-4 flex w-full justify-end px-4">
          <ThemeSwitch />
        </div>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
