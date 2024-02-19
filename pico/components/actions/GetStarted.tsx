"use client";
import { useRouter } from "next/router";
import { ReactNode, RefObject } from "react";
import { poppins } from "@/public/assets/fonts/poppins";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
type GetStartedProps = {
    firstOnBoardingRef:RefObject<HTMLDivElement> | null
}
const GetStarted = ({firstOnBoardingRef} : GetStartedProps):ReactNode => {
    const firstPageEnd = 1000;
    const router = useRouter();

    return (
        <div className={`(container) h-full lg:h-min lg:w-1/2 w-full p-32 lg:p-0 px-12 flex flex-col text-left`}>
            <div className="h-full lg:h-[400px] flex flex-col items-center lg:items-start">
              <h1 className={`text-[2.5rem] ${poppins.className} lg:text-[5rem] font-bold`}>
                PiCo
              </h1>
              <h2 className="text-2xl font-bold lg:font-normal lg:text-3xl">꽤나 새로운 공유의 시작</h2>

              <div className="(action) w-full h-max flex flex-col lg:p-0 gap-2 mt-auto items-center lg:items-start scrollbar-hide">
                <div  className={`w-fit flex items-center text-center lg:text-3xl text-2xl hover:underline underline-offset-8 cursor-pointer`}
                  onClick={() => router.push("/Login")}>
                  로그인
                  <IoIosArrowDropright className="mx-2"/>
                </div>

                <div className={`w-fit lg:mt-4 flex items-center text-center lg:text-3xl text-2xl hover:underline underline-offset-8 cursor-pointer`}
                  onClick={() => {
                    window.scrollTo(0, firstPageEnd + 1);
                    firstOnBoardingRef?.current?.scrollIntoView({behavior:'smooth'});
                  }}>
                  더 알아보기
                  <IoIosArrowDropdown className="mx-2" />
                </div>
              </div>
            </div>
          </div>
    );
}

export default GetStarted;