import { poppins } from "@/public/assets/fonts/poppins";
import { ReactNode } from "react";

const MainPageHeader = ():ReactNode=>{

    return <div className="lg:hidden fixed w-full h-14 bg-[#1c1c1e] border-b-slate-700 border-b-[1px] flex items-center z-50">
      <h1 className={`text-2xl p-5 ${poppins.className} lg:text-[5rem] font-bold`}>
        PiCo
      </h1>
    </div>
}

export default MainPageHeader;