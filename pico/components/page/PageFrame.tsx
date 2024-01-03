import { ReactNode } from "react";

const PageFrame = ({children,className}:{children:ReactNode,className:string}):ReactNode =>{
    return <div className={`h-[calc( var(--vh, 1vh) * 100)] ${className}}`}>{children}</div>
}

export default PageFrame;