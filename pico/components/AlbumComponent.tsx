import Image from "next/image";
import { StaticImageData } from "next/image";
import { TbBoxMultiple } from "react-icons/tb";
import Album from "@/templates/Album";
import { useSetRecoilState } from "recoil";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { formatDateString } from "@/lib/functions/functions";

const ThumbNail = ({ src, len }: { src: StaticImageData, len:number }) => {
  return (
    <div className={`(frame) w-full aspect-square rounded-md overflow-hidden relative`}>
    <Image src={src} alt="pic" className="object-cover w-full h-full" />
    {len > 1 && <TbBoxMultiple className="w-8 h-8 absolute bottom-4 right-4"/>}
  </div>
  );
};

const AlbumComponent= ({ item }: { item: Album }) => {
  const setCurAlbum = useSetRecoilState(curAlbumState);
  
  const Info = () =>{
    if(!item) return null
    else return <div className="(info) w-full aspect-[3/1] p-2 flex flex-col">
      <div className="(d-day) p-2 pb-0 ">{}</div>
      <ul className="p-2">{item.getTags.map((tag)=>
        <li className="(tags) inline-block list-none mr-3 text-[#aaaaaa] text-[2rem]">#{tag}</li>)}
      </ul> 
    </div>
  }
  
  return (
    <div className="(container) w-full aspect-[3/4]  p-2 relative cursor-pointer"
        onClick = {()=>setCurAlbum(item)}>
      <div className="w-full h-full relative rounded-md bg-pico_lighter">
        <ThumbNail src={item.getImageURLs[0]} len={item.getImageURLs.length}/>
        <Info/>
      </div>
    </div>
  );
};

export default AlbumComponent;
