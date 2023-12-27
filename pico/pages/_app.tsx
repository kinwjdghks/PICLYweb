import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
        <Head>
          <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover"/>
        </Head>
        <Component {...pageProps} />
    </RecoilRoot>
  );
}
