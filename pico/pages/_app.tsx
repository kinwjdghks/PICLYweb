import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { setScreenSize } from "@/lib/functions/screenSize";

export default function App({ Component, pageProps }: AppProps) {

  // useEffect(()=>{
  //   setScreenSize();
  // });

   return (
    <>
       <Head>
         <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover"/>
       </Head>
         <Component {...pageProps} />
    </>   
  );
}