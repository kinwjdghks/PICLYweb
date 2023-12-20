import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { useRecoilValue } from "recoil";
import LoadingPage from "../Loading";
import { GrNext,GrPrevious } from "react-icons/gr";

const BackDrop = () =>{
  return <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-80"></div>
}

const Slides = ({pics}:{pics:React.JSX.Element[]}) => {
  return <div className="w-min h-screen flex relative">{pics}</div>
}

const Action = ({prev,next}:{prev:()=>void, next:()=>void}) =>{

  const cn = "";
  return<>
  <div className="fill-white">
    <GrPrevious onClick={prev} color='white' style={{color:"white", width:'200px',height:'200px'}}/>
    </div>
    <GrNext onClick={next} className={``}/>
  </>

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
  
  return <div className="w-min h-min fixed left-1/2 -translate-x-1/2 bottom-10 flex gap-3 justify-center
  ">
    {...indicators}
  </div>;
};

const PicoCarousel = ()=> {
  const album = useRecoilValue(curAlbumState);
  
  if(!album) return <LoadingPage/>
  const steps = album.getImageURLs.length;
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const screenRef = useRef<HTMLDivElement>(null);
  const activeImgRef = useRef<HTMLDivElement>(null);
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
  

  useEffect(()=>{
    // if (screenRef.current) {
    //   const scrollPosition = activeIndex * screenRef.current.clientWidth;
    //   screenRef.current.scrollTo({
    //     left: scrollPosition,
    //     behavior: 'smooth',
    //   });
    // }
    if(activeImgRef.current){
      activeImgRef.current.scrollIntoView({behavior:"smooth"});
      console.log('scroll');
    }
    console.log(activeIndex);
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

  setTimeout(()=>next,1000);
  const imageList = album.getImageURLs.map((url,idx) => (
    <div key={idx} className="(imagebackground) w-screen h-screen flex justify-center align-middle snap-center relative">
      {idx == activeIndex && <div ref={activeImgRef}></div> }
      <Image
        src={url.src}
        alt={`${url}`}
        fill
        className="relative object-contain scale-[85%]"
        draggable={false}
      ></Image>
    </div>
  ));

  //mui codes
  

  return (
    <div className="(background) w-screen h-screen absolute overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide"
    ref={screenRef}>
      <BackDrop/>
      <Slides pics={imageList}/>
      <Action next={next} prev={prev}/>
    </div>
  );
}

export default PicoCarousel;
