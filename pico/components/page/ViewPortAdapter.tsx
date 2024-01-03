import { ReactNode } from "react";

const ViewPortAdapter = ({children,className}:{children:ReactNode,className:string}):ReactNode =>{
    return <div className={`lg:h-screen h-[calc(var(--vh,1vh)*100)] overscroll-y-none ${className}}`}>{children}</div>
}

export default ViewPortAdapter;