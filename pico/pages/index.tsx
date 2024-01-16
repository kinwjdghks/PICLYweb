import Image from "next/image";
import styles from "@/styles/animation.module.css";
import logo_big_bright from "@/public/assets/images/PiCo_Logo.svg";
import { useRouter } from "next/router";
import { poppins } from "@/public/assets/fonts/poppins";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import flatIphone from "@/public/assets/images/flatIphone.svg";
import catAlbum from "@/public/assets/images/catAlbum.svg";
import racoonAlbum from "@/public/assets/images/racoonAlbum.svg";
import emptyAlbum from "@/public/assets/images/emptyAlbum.svg";
import onBoarding2Image from "@/public/assets/images/onBoarding2Image.svg";
import copyToast from "@/public/assets/images/copyToast.svg";
import outDatedAlbum from "@/public/assets/images/outDatedAlbum.svg";
import { notosans } from "@/public/assets/fonts/notosans";

export default function Home() {
  const router = useRouter();
  //constants
  const firstPageEnd = 1000;
  const secondPageEnd = 4000;
  const thirdPageEnd = 8000;
  const documentHeight = "h-[9000px]";
  const startOffset = 1000;
  const content = {
    onBoarding1Title: "손쉽게 사진을 공유하세요",
    onBoarding1Content:
      "PiCo는 사진을 빠르고 안전하게 공유하는\n새로운 방법입니다.\n\n익명으로 사진을 업로드하고,\n링크를 통해 손쉽게 공유하세요.",
    onBoarding2Title: "익명성을 보장합니다",
    onBoarding2Content:
      "공유된 링크를 통해 앨범을 조회한 사용자는\n사용자의 정보를 확인할 수 없습니다.\n\n나를 밝히지 않고 사진을 전달하고 싶다면,\nPiCo가 최적의 선택입니다.",
    onBoarding3Title: "자동으로 만료되는 앨범",
    onBoarding3Content:
      "앨범을 게시할 때 만료시간을 설정할 수 있습니다.\n만료시간 이후에는 본인만 앨범을 확인할 수 있습니다.\n\n이제는 더욱 편하게 앨범을 관리하세요.",
  };

  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [scrollpos, setScrollPos] = useState<number>(0);
  useEffect(() => {
    const handlescroll = () => {
      console.log(document.documentElement.scrollTop);
      setScrollPos(document.documentElement.scrollTop);
    };
    document?.addEventListener("scroll", (e) => handlescroll());
    return document?.removeEventListener("scroll", (e) => handlescroll());
  }, []);

  // useEffect(() => {
  //   //temporaily remove scrollbar
  //   const style = document.createElement("style");
  //   style.innerHTML = `
  //   body {
  //     -ms-overflow-style: none;
  //     scrollbar-width: none;
  //   }
  //   body::-webkit-scrollbar {
  //     display: none;
  //   }`;
  //   document.head.appendChild(style);
  //   return () => {
  //     document.head.removeChild(style);
  //   };
  // }, []);

  return (
    <div className={`(mainpage) w-screen ${documentHeight} relative bg-[#1e1e1e] flex flex-col align-middle overflow-hidden ${notosans.className} text-white`}>
      
      <div className={`(onboarding 1) lg:fixed w-full h-[100svh] flex`}
        ref={detailsRef} >
        {scrollpos < secondPageEnd && (
          <div className={`lg:w-1/2 lg:h-full flex justify-end items-center relative`}>
            <div className="relative overflow-hidden w-full -right-[calc(100%-520px)]">
              <div className={`absolute ${poppins.className} font-bold text-3xl top-[70px] left-[50px]`}>
                Pico
              </div>

              <Image className="w-[439px] h-[451px]"
                src={flatIphone}
                alt="Iphone"
                width={0}
                height={0}
                priority={true}/>
              <Image className="absolute top-[120px] left-[35px] w-[170px]"
                src={catAlbum}
                alt="catAlbum"
                width={0}
                height={0}
                style={{ top:scrollpos < firstPageEnd ? 230 : Math.max(230 - (scrollpos - firstPageEnd) / 15, 120)}}
                priority={true} />
              <Image className={`absolute top-[350px] left-[35px] w-[170px]`}
                src={emptyAlbum}
                alt="emptyAlbum"
                width={0}
                height={0}
                style={{top: scrollpos < firstPageEnd ? 230 + 230 : Math.max( 230 + 230 - (scrollpos - firstPageEnd) / 15, 350)}}
                priority={true} />
              <Image className={`absolute top-[350px] left-[220px] w-[170px]`}
                src={emptyAlbum}
                alt="emptyAlbum"
                width={0}
                height={0}
                priority={true}/>
              <Image className="absolute top-[120px] left-[220px] w-[170px]"
                src={racoonAlbum}
                alt="racoonAlbum"
                width={0}
                height={0}
                style={{  width: scrollpos < firstPageEnd ? 170 : Math.min(170 + (scrollpos - firstPageEnd) / 15, 250)}}
                priority={true}/>
            </div>
          </div>
        )}
        {firstPageEnd < scrollpos && scrollpos < secondPageEnd && (
          <div className={`lg:w-1/2 lg:h-full flex items-center opacity-0 ${styles.__onBoarding__appear} z-[-1]`}>
            <div className="lg:h-[350px] lg:px-12 flex flex-col justify-between">
              <h1 className="text-4xl font-bold">{content.onBoarding1Title}</h1>
              <h2 className="text-2xl whitespace-pre-line">
                {content.onBoarding1Content}
              </h2>
            </div>
          </div>
        )}
      </div>

      {scrollpos < firstPageEnd && (
        <div className="(title) lg:fixed w-full h-[100svh] flex-grow flex flex-col align-middle items-center lg:flex-row-reverse">
          <Image className={`w-28 h-28 mt-16 lg:hidden rotate-12`}
            alt="logo"
            src={logo_big_bright}
            priority={true}/>
          <div className={`(container) lg:w-1/2 w-full lg:px-12 flex flex-col text-left`}>
            <div className="lg:h-[400px] flex flex-col justify-between ">
              <h1 className={`text-[2.5rem] ${poppins.className} lg:text-[5rem] font-bold`}>
                PiCo
              </h1>
              <h2 className="text-xl lg:text-3xl">손쉬운 익명 사진 공유</h2>

              <div className="(action) w-full h-max flex flex-col lg:p-0 gap-2 mt-auto lg:items-start scrollbar-hide">
                <div  className={`w-fit flex items-center text-center lg:text-3xl text-2xl hover:underline underline-offset-8 cursor-pointer`}
                  onClick={() => router.push("/Login")}>
                  로그인
                  <IoIosArrowDropright className="mx-2"/>
                </div>

                <div className={`w-fit lg:mt-4 flex items-center text-center lg:text-3xl text-2xl hover:underline underline-offset-8 cursor-pointer`}
                  onClick={() => window.scrollTo(0, firstPageEnd + 1)}>
                  더 알아보기
                  <IoIosArrowDropdown className="mx-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {secondPageEnd < scrollpos && scrollpos < thirdPageEnd && (
        <div className={`(onboarding 2) lg:fixed w-full h-[100svh] flex`}>
          <div className={`lg:w-1/2 lg:h-full flex items-center justify-end lg:px-12 ${styles.__onBoarding__appear} `}>
            <div className="lg:h-[350px] flex flex-col justify-between">
              <h1 className="text-4xl text-right font-bold">
                {content.onBoarding2Title}
              </h1>
              <h2 className="text-2xl text-right whitespace-pre-line">
                {content.onBoarding2Content}
              </h2>
            </div>
          </div>
          <div className="lg:w-1/2 lg:h-full flex items-center">
            <div className="relative items-center left-[10%]">
              <Image className="w-[500px] h-[500px]"
                src={onBoarding2Image}
                alt="onBoarding2"
                width={0}
                height={0}
                priority={true}/>
              {secondPageEnd + startOffset < scrollpos &&
                scrollpos < thirdPageEnd - startOffset && (
                  <Image className={`absolute top-[250px] left-[155px] w-[190px] ${styles.__onBoarding__msg_toast}`}
                    src={copyToast}
                    alt="copyToast"/>
                )}
            </div>
          </div>
        </div>
      )}

      {thirdPageEnd < scrollpos && (
        <div className={`(onboarding 3) lg:fixed w-full h-[100svh] flex`}>
          <div className="lg:w-1/2 lg:h-full flex justify-end items-center">
            <div className="relative right-[10%]">
              <Image
                src={outDatedAlbum}
                alt="outDatedAlbum"
                width={0}
                height={0}
                priority={true}/>
            </div>
          </div>
          <div className={`lg:w-1/2 lg:h-full flex items-center lg:px-12 ${styles.__onBoarding__appear} `}>
            <div className="lg:h-[350px] flex flex-col justify-between">
              <h1 className="text-4xl font-bold">{content.onBoarding3Title}</h1>
              <h2 className="text-2xl whitespace-pre-line">
                {content.onBoarding3Content}
              </h2>
              <div className={`w-fit flex items-center text-center lg:text-3xl text-2xl hover:underline underline-offset-8 cursor-pointer opacity-0 ${styles.__onBoarding__appear_delay}`}
                onClick={() => router.push("/Login")} >
                시작하기
                <IoIosArrowDropright className="mx-2" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
