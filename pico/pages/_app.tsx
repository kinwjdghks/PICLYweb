import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { useRouter } from "next/router";

function Layout({children}:{children: any}) {
  const router = useRouter();
  const pathname = router.pathname;
  // console.log(router.pathname);
  return (
    <Fragment>
        
        <main>{children}</main>
    </Fragment>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
