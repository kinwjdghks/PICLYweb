import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import nextImg from '@/public/assets/images/arrow_forward.svg'
import prevImg from '@/public/assets/images/arrow_back.svg'
import LoadingPage from "./Loading";
import { Album } from "@/templates/Album";

const Action = ({prev,next}:{prev:()=>void, next:()=>void}) =>{

  const cn = "fixed top-1/2 -translate-y-1/2 lg:w-12 lg:h-12 h-full w-24 lg:opacity-60 opacity-0 cursor-pointer";
  return<>
    <Image className={`${cn} lg:left-4 left-0`} src={prevImg} alt='prev' width={0} height={0} sizes='100vw' onClick={prev}/>
    <Image className={`${cn} lg:right-4 right-0`} src={nextImg} alt='next' width={0} height={0} sizes='100vw' onClick={next}/>
  </>

}

const Indicators = ({
  steps,
  activeIndex,
  onClickHandler,
}: {
  steps:number,
  activeIndex: number;
  onClickHandler: (newIndex: number) => void;
}) => {
  const indicators = [];
  for(let i=0;i<steps;i++){
    indicators.push(
      <span key={i}
      className={`w-8 h-2 rounded-md ${activeIndex == i ? 'bg-slate-100' : 'bg-slate-400'} cursor-pointer`}
      onClick={() => onClickHandler(i)}></span>
    );
  }

  
  return <div className="w-min h-min fixed left-1/2 -translate-x-1/2 bottom-5 flex gap-3 justify-center
  ">
    {...indicators}
  </div>;
};

const PicoCarousel = ({album}:{album:Album})=> {
  console.log('curAlbumState',album);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const isScrollListenerAdded = useRef<boolean>(false);
  const activeImgRef = useRef<HTMLDivElement>(null);
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
  const singlePic = album.imageURLs.length === 1;

  useEffect(() => {
    const container = screenRef.current;
    console.log("containerRef: "+ container);
    if (container && !isScrollListenerAdded.current) {
      container.addEventListener("scroll", updateIndicatorOnScroll);
      console.log('eventhandler attached')
      isScrollListenerAdded.current = true;

      return () => {
        container.removeEventListener("scroll", updateIndicatorOnScroll);
        isScrollListenerAdded.current = false;
      };
    }
  }, [screenRef.current]);

  useEffect(()=>{
    
    if(activeImgRef.current){
      activeImgRef.current.scrollIntoView({
        behavior:"smooth",
      });
    }
  },[activeIndex]);
  
  if(!album || !album.imageURLs) return <LoadingPage/>

  const steps = album.imageURLs.length;

  const next = () => {
    const nextIndex = activeIndex === steps - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const nextIndex = activeIndex === 0 ? steps - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const updateIndicatorOnScroll = () => {
    // console.log(screenRef.current?.scrollLeft);
    if(timerRef.current !== null){
      clearTimeout(timerRef.current);
    }
  
    timerRef.current = setTimeout(() => {
      if (screenRef.current) {
        const screenWidth = screenRef.current.clientWidth;
        // console.log(Math.round(screenRef.current.scrollLeft/screenWidth));
        setActiveIndex(Math.round(screenRef.current.scrollLeft/screenWidth));
        }      
      }, 50); 
  };

  const imageList = album.imageURLs.map((url,idx) => (
    <div key={idx} className="(imagebackground) w-screen h-screen flex justify-center align-middle snap-center relative">
      {idx == activeIndex && <div className="(anchor) w-1 h-1 absolute" key={idx} ref={activeImgRef}></div>}
      <Image
        src={url}
        alt={`${url}`}
        width={0}
        height={0}
        sizes='100vw'
        fill
        className="relative object-contain scale-[90%]"
        draggable={false}
        priority={true}
      ></Image>
    </div>
  ));
  

  return (<div className="(carousel background) w-full h-full absolute overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide " 
         ref={screenRef}>
      <div className="(screen) w-min h-screen flex relative" >{imageList}</div>
      {!singlePic && <Action next={next} prev={prev}/>}
      {!singlePic && <Indicators steps={steps} activeIndex={activeIndex} onClickHandler={goToIndex}/>}
    </div>
  );
}

export default PicoCarousel;
