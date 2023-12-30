import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps } }:AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover"/>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
