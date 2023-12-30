import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function App({ Component, pageProps }: AppProps) {
   return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
       <Head>
         <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover"/>
       </Head>
         <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}