import { poppins } from "@/public/assets/fonts/poppins";
import Link from "next/link";

const ExpiredPage = () =>{

    return <div className="w-screen h-screen bg-black items-center relative">
        <div  className={`(actionbar) w-screen h-max fixed flex items-center top-0 lg:p-12 p-4 pt-2 ${poppins.className} z=[102]`}>
        <Link className="w-max h-max font-bold lg:text-4xl text-2xl"
          href={"/"}
          onClick={() => {}}>
          PiCo
        </Link>
      </div>
        <p className="w-full mt-[50%] text-center text-2xl">기한이 만료된 데이터입니다</p>
    </div>
}

export default ExpiredPage;