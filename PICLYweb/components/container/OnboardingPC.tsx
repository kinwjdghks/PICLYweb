"use client";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import flatIphone from "@/public/assets/images/flatIphone.png";
import catAlbum from "@/public/assets/images/catAlbum.svg";
import racoonAlbum from "@/public/assets/images/racoonAlbum.svg";
import emptyAlbum from "@/public/assets/images/emptyAlbum.svg";
import styles from "@/styles/animation.module.css";
import onBoarding2ImagePC from "@/public/assets/images/onBoarding2ImagePC.png";
import copyToast from "@/public/assets/images/copyToast.svg";
import outDatedAlbum from "@/public/assets/images/outDatedAlbum.png";
import { poppins } from "@/public/assets/fonts/poppins";
import { ONBOARDING_CONTENT } from "@/public/assets/texts";
import GetStarted from "../actions/GetStarted";
import { IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";
import PICLYLogo from "./Logo";
type OnboardingPCProps = {};
const firstPageEnd = 1000;
const secondPageEnd = 4000;
const thirdPageEnd = 8000;
const startOffset = 1000;

const OnboardingPC = ({}: OnboardingPCProps): ReactNode => {

  //useState
  const [scrollpos, setScrollPos] = useState<number>(0);
  const [clientSide,setClientSide] = useState<boolean>(false);
  useEffect(()=>{
    setClientSide(true);
  },[]);
  //useRouter
  const router = useRouter();
  //useRef
  const detailsRef = useRef<HTMLDivElement | null>(null);
  //useEffect
  useEffect(() => {
    const handlescroll = () => {
      console.log(document.documentElement.scrollTop);
      setScrollPos(document.documentElement.scrollTop);
    };
    document?.addEventListener("scroll", (e) => handlescroll());
    return document?.removeEventListener("scroll", (e) => handlescroll());
  }, []);

  return (
    <>
      {clientSide && (window.matchMedia("screen and (min-width: 1024px)").matches
        ? scrollpos < firstPageEnd
        : true) && (
        <div className="(title) hidden lg:fixed w-full h-[100svh] flex-grow lg:flex flex-col align-middle items-center lg:flex-row-reverse z-10">
          <GetStarted firstOnBoardingRef={null} />
        </div>
      )}
      <div
        className={`(onboarding 1) hidden  lg:fixed w-full h-[100svh] lg:flex`}
        ref={detailsRef}>
        {clientSide &&
          window.matchMedia("screen and (min-width: 1024px)").matches &&
          scrollpos < secondPageEnd && (
            <div className={`lg:w-1/2 lg:h-full lg:flex justify-end items-center relative`}>
              <div className="relative overflow-hidden w-full -right-[calc(100%-520px)]">
                <div className={`absolute ${poppins.className} font-bold text-3xl top-[70px] left-[50px]`}>
                  <PICLYLogo/>
                </div>
                <Image
                  className="w-[439px]"
                  src={flatIphone}
                  alt="Iphone"
                  width={0}
                  height={0}
                  priority={true}/>
                <Image
                  className="absolute top-[120px] left-[35px] w-[170px]"
                  src={catAlbum}
                  alt="catAlbum"
                  width={0}
                  height={0}
                  style={{
                    top:
                      scrollpos < firstPageEnd
                        ? 230
                        : Math.max(230 - (scrollpos - firstPageEnd) / 15, 120),
                  }}
                  priority={true}/>
                <Image
                  className={`absolute top-[350px] left-[35px] w-[170px]`}
                  src={emptyAlbum}
                  alt="emptyAlbum"
                  width={0}
                  height={0}
                  style={{
                    top:
                      scrollpos < firstPageEnd
                        ? 230 + 230
                        : Math.max(
                            230 + 230 - (scrollpos - firstPageEnd) / 15,
                            350
                          ),
                  }}
                  priority={true}/>
                <Image
                  className={`absolute top-[350px] left-[220px] w-[170px]`}
                  src={emptyAlbum}
                  alt="emptyAlbum"
                  width={0}
                  height={0}
                  priority={true}
                />
                <Image
                  className="absolute top-[120px] left-[220px] w-[170px]"
                  src={racoonAlbum}
                  alt="racoonAlbum"
                  width={0}
                  height={0}
                  style={{
                    width:
                      scrollpos < firstPageEnd
                        ? 170
                        : Math.min(170 + (scrollpos - firstPageEnd) / 15, 250),
                  }}
                  priority={true}
                />
              </div>
            </div>
          )}
        {clientSide &&
          window.matchMedia("screen and (min-width: 1024px)").matches &&
          firstPageEnd < scrollpos &&
          scrollpos < secondPageEnd && (
            <div
              className={`lg:w-1/2 lg:h-full flex items-center opacity-0 ${styles.__onBoarding__appear} z-[-1]`}
            >
              <div className="lg:h-[350px] lg:px-12 flex flex-col justify-between">
                <h1 className="text-4xl font-bold">
                  {ONBOARDING_CONTENT.onBoarding1Title}
                </h1>
                <h2 className="text-2xl whitespace-pre-line">
                  {ONBOARDING_CONTENT.onBoarding1Content}
                </h2>
              </div>
            </div>
          )}
      </div>

      {clientSide &&
        window.matchMedia("screen and (min-width: 1024px)").matches &&
        secondPageEnd < scrollpos &&
        scrollpos < thirdPageEnd && (
          <div
            className={`(onboarding 2) hidden  lg:fixed w-full h-[100svh] lg:flex`}
          >
            <div
              className={`lg:w-1/2 lg:h-full flex items-center justify-end lg:px-12 ${styles.__onBoarding__appear} `}
            >
              <div className="lg:h-[350px] flex flex-col justify-between">
                <h1 className="text-4xl text-right font-bold">
                  {ONBOARDING_CONTENT.onBoarding2Title}
                </h1>
                <h2 className="text-2xl text-right whitespace-pre-line">
                  {ONBOARDING_CONTENT.onBoarding2Content}
                </h2>
              </div>
            </div>
            <div className="lg:w-1/2 lg:h-full flex items-center">
              <div className="relative items-center left-[10%]">
                <Image
                  className="w-[500px]"
                  src={onBoarding2ImagePC}
                  alt="onBoarding2"
                  width={0}
                  height={0}
                  priority={true}
                />
                {secondPageEnd + startOffset < scrollpos &&
                  scrollpos < thirdPageEnd - startOffset && (
                    <Image
                      className={`absolute top-[250px] left-[155px] w-[190px] ${styles.__onBoarding__msg_toast}`}
                      src={copyToast}
                      alt="copyToast"
                    />
                  )}
              </div>
            </div>
          </div>
        )}

      {clientSide &&
        window.matchMedia("screen and (min-width: 1024px)").matches &&
        thirdPageEnd < scrollpos && (
          <div
            className={`(onboarding 3) hidden  lg:fixed w-full h-[100svh] lg:flex`}
          >
            <div className="lg:w-1/2 lg:h-full flex justify-end items-center">
              <div className="relative right-[10%]">
                <Image
                  className="w-[439px]"
                  src={outDatedAlbum}
                  alt="outDatedAlbum"
                  width={0}
                  height={0}
                  priority={true}
                />
              </div>
            </div>
            <div className={`lg:w-1/2 lg:h-full flex items-center lg:px-12 ${styles.__onBoarding__appear} `}>
              <div className="lg:h-[350px] flex flex-col justify-between">
                <h1 className="text-4xl font-bold">
                  {ONBOARDING_CONTENT.onBoarding3Title}
                </h1>
                <h2 className="text-2xl whitespace-pre-line">
                  {ONBOARDING_CONTENT.onBoarding3Content}
                </h2>
                <div className={`w-fit flex items-center text-center lg:text-3xl text-2xl hover:underline underline-offset-8 cursor-pointer opacity-0 ${styles.__onBoarding__appear_delay}`}
                  onClick={() => router.push("/Login")}>
                  시작하기
                  <IoIosArrowDropright className="mx-2" />
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default OnboardingPC;
