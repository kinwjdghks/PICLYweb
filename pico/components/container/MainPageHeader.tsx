import { poppins } from "@/public/assets/fonts/poppins";
import { ReactNode } from "react";
import appstore from "@/public/assets/images/DownloadAppstore.svg"
import Image from "next/image";

const MainPageHeader = ():ReactNode=>{

    return <div className="lg:hidden fixed w-full h-14 bg-[#1c1c1e] border-b-slate-700 border-b-[1px] flex items-center justify-between z-50">
      <h1 className={`text-2xl p-5 ${poppins.className} lg:text-[5rem] font-bold`}>
        PiCo
      </h1>
      <Image className="w-24 m-5"
       src={appstore} alt="appstore"/>
    </div>
}

export default MainPageHeader;