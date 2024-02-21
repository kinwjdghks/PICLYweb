import bayon from "@/public/assets/fonts/bayon";
import { ReactNode } from "react";

const PICLYLogo = ({className}:{className?:string}):ReactNode =>{
    return <em className={`leading-none ${bayon.className} ${className}`}>PICLY</em>
}

export default PICLYLogo;