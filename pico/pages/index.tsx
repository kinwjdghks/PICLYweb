import Image from "next/image";
import styles from "@/styles/animation.module.css";
import { useRouter } from "next/router";
import { poppins } from "@/public/assets/fonts/poppins";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import flatIphone from "@/public/assets/images/flatIphone.png";
import catAlbum from "@/public/assets/images/catAlbum.svg";
import racoonAlbum from "@/public/assets/images/racoonAlbum.svg";
import emptyAlbum from "@/public/assets/images/emptyAlbum.svg";
import onBoarding2Image from "@/public/assets/images/onBoarding2Image.png";
import copyToast from "@/public/assets/images/copyToast.svg";
import outDatedAlbum from "@/public/assets/images/outDatedAlbum.png";
import { notosans } from "@/public/assets/fonts/notosans";
import MainPageHeader from "@/components/container/MainPageHeader";

export default function Home() {
  const [clientSide,setClientSide] = useState<boolean>(false);

  const router = useRouter();
  //constants
  const firstPageEnd = 1000;
  const secondPageEnd = 4000;
  const thirdPageEnd = 8000;
  const documentHeight = "lg:h-[10000px]";
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

  useEffect(()=>{
    setClientSide(true);
  },[]);
  useEffect(() => {
    const handlescroll = () => {
      console.log(document.documentElement.scrollTop);
      setScrollPos(document.documentElement.scrollTop);
    };
    document?.addEventListener("scroll", (e) => handlescroll());
    return document?.removeEventListener("scroll", (e) => handlescroll());
  }, []);

  useEffect(() => {
    //temporaily remove scrollbar
    const style = document.createElement("style");
    style.innerHTML = `
    body {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    body::-webkit-scrollbar {
      display: none;
    }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`(mainpage) w-screen ${documentHeight} relative bg-[#1c1c1e] flex flex-col align-middle overflow-y-scroll lg:overflow-hidden ${notosans.className} text-white`}>
      <MainPageHeader/>
      {clientSide && (window.matchMedia("screen and (min-width: 1024px)").matches ? scrollpos < firstPageEnd : true) && (
        <div className="(title) lg:fixed w-full h-[100svh] flex-grow flex flex-col align-middle items-center lg:flex-row-reverse z-10">
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
                  onClick={() => window.scrollTo(0, firstPageEnd + 1)}>
                  더 알아보기
                  <IoIosArrowDropdown className="mx-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`(onboarding 1) hidden  lg:fixed w-full h-[100svh] lg:flex`}
        ref={detailsRef} >
        {clientSide && window.matchMedia("screen and (min-width: 1024px)").matches && scrollpos < secondPageEnd && (
          <div className={`lg:w-1/2 lg:h-full lg:flex justify-end items-center relative`}>
            <div className="relative overflow-hidden w-full -right-[calc(100%-520px)]">
              <div className={`absolute ${poppins.className} font-bold text-3xl top-[70px] left-[50px]`}>
                Pico
              </div>
              <Image className="w-[439px]"
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
        {clientSide && window.matchMedia("screen and (min-width: 1024px)").matches && firstPageEnd < scrollpos && scrollpos < secondPageEnd && (
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

      {clientSide && window.matchMedia("screen and (min-width: 1024px)").matches && secondPageEnd < scrollpos && scrollpos < thirdPageEnd && (
        <div className={`(onboarding 2) hidden  lg:fixed w-full h-[100svh] lg:flex`}>
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
              <Image className="w-[500px]"
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

      {clientSide && window.matchMedia("screen and (min-width: 1024px)").matches && thirdPageEnd < scrollpos && (
        <div className={`(onboarding 3) hidden  lg:fixed w-full h-[100svh] lg:flex`}>
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

      <div className={`(mobile onboarding1) lg:hidden w-full h-[100svh] p-8 pt-24 flex flex-col justify-between ${notosans.className}`}>
        <h1 className="text-2xl font-bold text-center">{content.onBoarding1Title}</h1>
        <div className="w-full flex justify-center">
        <div className="relative overflow-hidden">
          <div className={`absolute ${poppins.className} font-bold text-2xl top-[50px] left-[35px]`}>
            Pico
          </div>
          <Image className="w-[300px]"
            src={flatIphone}
            alt="Iphone"
            width={300}
            priority={true}/>
          <Image className="absolute top-[90px] left-[25px] w-[120px]"
            src={catAlbum}
            alt="catAlbum"
            width={120}
            priority={true} />
          <Image className={`absolute top-[260px] left-[25px] w-[120px]`}
            src={emptyAlbum}
            alt="emptyAlbum"
            width={120}
            priority={true} />
          <Image className={`absolute top-[260px] left-[155px] w-[120px]`}
            src={emptyAlbum}
            alt="emptyAlbum"
            width={0}
            priority={true}/>
          <Image className="absolute top-[90px] left-[155px] w-[120px]"
            src={racoonAlbum}
            alt="racoonAlbum"
            width={120}
            priority={true}/>
        </div>
        </div>
        <h2 className="whitespace-pre-wrap">{content.onBoarding1Content}</h2>

      </div>
      <div className={`(mobile onboarding2) lg:hidden w-full h-[100svh] p-8 pt-24 flex flex-col justify-between ${notosans.className}`}>
        <h1 className="text-2xl font-bold text-center">{content.onBoarding2Title}</h1>
        <div className="relative justify-center flex">
          <Image className="w-[300px]"
            src={onBoarding2Image}
            alt="onBoarding2"
            priority={true}/>
            <Image className={`absolute top-[150px] left-1/2 -translate-x-1/2 w-[150px] {styles.__onBoarding__msg_toast}`}
              src={copyToast}
              alt="copyToast"/>
          </div>
        <h2 className="whitespace-pre-wrap">{content.onBoarding2Content}</h2>
      </div>
      <div className={`(mobile onboarding3) lg:hidden w-full h-[100svh] p-8 pt-24 flex flex-col justify-between ${notosans.className}`}>
        <h1 className="text-2xl font-bold text-center">{content.onBoarding3Title}</h1>
        <div className="relative flex justify-center">
          <Image
            className="w-[300px]"
            src={outDatedAlbum}
            alt="outDatedAlbum"
            priority={true}/>
          </div>
        <h2 className="whitespace-pre-wrap">{content.onBoarding3Content}</h2>

      </div>
    </div>
  );
}
