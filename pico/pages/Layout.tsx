import { Fragment } from "react";
import Header from "@/components/User/Header";
import { useRouter } from "next/router";

function Layout({children}:{children: any}) {
  const router = useRouter();
  const pathname = router.pathname;
  // console.log(router.pathname);
  const showHeader = pathname.startsWith("/User") || pathname.startsWith("/Gallery");
  return (
    <Fragment>
        {showHeader && <Header/>}
        <main>{children}</main>
    </Fragment>
  );
}

export default Layout;