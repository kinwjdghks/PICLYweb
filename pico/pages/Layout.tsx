import { Fragment } from "react";
import { useRouter } from "next/router";

function Layout({children}:{children: any}) {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <Fragment>
        <main>{children}</main>
    </Fragment>
  );
}

export default Layout;