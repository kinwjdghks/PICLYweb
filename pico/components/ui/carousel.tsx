import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrow_forward from "@/public/assets/images/arrow_forward.svg";
import arrow_back from "@/public/assets/images/arrow_back.svg";

export interface PIC {
  // src: string;
  src: StaticImageData;
  key: number;
}

type carouselProps = {
  pics: PIC[];
};

const Arrow = ({
  onClick,
  dir,
}: {
  onClick: () => void;
  dir: "back" | "forward";
}) => {
  const pos = dir == "back" ? "left-0" : "right-0";

  return (
    <div
      className={`(${dir} action) w-24 h-full fixed top-0 ${pos} flex justify-center align-middle`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <Image
          src={dir == "back" ? arrow_back : arrow_forward}
          alt="arrow"
          className="w-16 h-16"
          
        />
      </button>
    </div>
  );
};

const Arrows = ({next,prev}:{next:()=>void,prev:()=>void}) => {
  return<>
    <Arrow onClick={prev} dir="back" />
    <Arrow onClick={next} dir="forward" />
  </>;
};

const BackDrop = () =>{
  return <div className="w-screen h-screen fixed top-0 left-0 bg-white opacity-[0.15]"></div>
}

const Indicators = ({
  totalNum,
  curIdx,
  onClickHandler,
}: {
  totalNum:number,
  curIdx: number;
  onClickHandler: (newIndex: number) => void;
}) => {
  const indicators = [];
  for(let i=0;i<totalNum;i++){
    indicators.push(
      <span  key={i}
      className={`w-8 h-2 rounded-md ${curIdx == i ? 'bg-slate-100' : 'bg-slate-400'} cursor-pointer`}
      onClick={() => onClickHandler(i)}></span>
    );
  }
  
  return <div className="w-min h-min fixed left-1/2 -translate-x-1/2 bottom-12 flex gap-3 justify-center">
    {...indicators}
  </div>;
};

function PicoCarousel({ pics }: carouselProps) {
  const length = pics.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
  

  useEffect(()=>{
    if (screenRef.current) {
      const scrollPosition = activeIndex * screenRef.current.clientWidth;
      screenRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
    // console.log(activeIndex);
  },[activeIndex]);

  useEffect(() => {

    const handleScroll = () => {
      if (timerRef.current !== null){
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (screenRef.current) {
          const scrollPosition = screenRef.current.scrollLeft;
          const newIndex = Math.round(scrollPosition / screenRef.current.clientWidth) % length;
          setActiveIndex(newIndex);
        }
      }, 100);        
      
    }
  
    
    if (screenRef.current) {
      screenRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (screenRef.current) {
        screenRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  

  const next = () => {
    const nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const nextIndex = activeIndex === 0 ? length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const imageList = pics.map((url) => (
    <div className="(imagebackground) w-screen h-screen flex justify-center align-middle snap-center relative">
      <Image
        src={url.src}
        alt={`${url}`}
        className="relative object-contain scale-90 translate-y-[-5%]"
        draggable={false}
      ></Image>
    </div>
  ));

  return (
    <div className="(background) w-screen h-screen absolute overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide"
    ref={screenRef}>
      <BackDrop/>
      <div className="w-min h-screen flex relative">{imageList}</div>
      <Arrows prev={prev} next={next}/>
      <Indicators totalNum={length} curIdx={activeIndex} onClickHandler={goToIndex}/>
    </div>
  );
}

export default PicoCarousel;
