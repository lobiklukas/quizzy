import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <>
      <Head>
        <meta name="description" content="Quizzy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="application-name" content="Quizzy" />
        <meta name="apple-mobile-web-app-title" content="Quizzy" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <SessionProvider session={session}>
        <div>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
