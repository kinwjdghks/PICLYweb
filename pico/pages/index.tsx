import { useEffect } from "react";
import { notosans } from "@/public/assets/fonts/notosans";
import MainPageHeader from "@/components/container/MainPageHeader";
import OnboardingMobile from "@/components/container/OnboardingMobile";
import OnboardingPC from "@/components/container/OnboardingPC";


export default function Home() {

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
    <div className={`(mainpage) w-screen lg:h-[10000px] relative bg-[#1c1c1e] flex flex-col align-middle overflow-y-scroll lg:overflow-hidden ${notosans.className} text-white`}>
      <MainPageHeader/>
      <OnboardingPC/>
      <OnboardingMobile/>
    </div>
  );
}
