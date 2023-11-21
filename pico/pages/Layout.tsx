import { Fragment } from "react";
import Header from "@/components/User/Header";
import { useRouter } from "next/router";

function Layout({children}:{children: any}) {
  const router = useRouter();
  console.log(router.pathname);
  const showHeader = router.pathname.startsWith("/User");
  return (
    <Fragment>
        {showHeader && <Header/>}
        <main>{children}</main>
    </Fragment>
  );
}

export default Layout;