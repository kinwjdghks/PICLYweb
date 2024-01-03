import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from "react";
export default function App({ Component, pageProps }: AppProps) {

  const setScreenSize = () =>{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(()=>{
    setScreenSize();
  });

   return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
       <Head>
         <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover"/>
       </Head>
         <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}