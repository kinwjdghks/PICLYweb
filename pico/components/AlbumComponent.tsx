import Image from "next/image";
import { TbBoxMultiple } from "react-icons/tb";
import Album from "@/templates/Album";
import { useSetRecoilState } from "recoil";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { formatDateString, dateDiffAsString } from "@/lib/functions/functions";

const ThumbNail = ({ src, len }: { src: string, len:number }) => {
  return (
    <div className={`(frame) w-full aspect-square rounded-md overflow-hidden relative`}>
    <Image src={src} alt="pic" width={0} height={0} sizes="100vw" className="object-cover w-full h-full"  draggable='false' />
    {len > 1 && <TbBoxMultiple className="w-8 h-8 absolute bottom-4 right-4"/>}
  </div>
  );
};

const AlbumComponent= ({ item }: { item: Album }) => {
  const setCurAlbum = useSetRecoilState(curAlbumState);
  
  const Info = () =>{
    if(!item) return <></>
    const created = item.getCreationTime;
    const expire = item.getExpireTime;

    return <div className="(info) w-full aspect-[3/1] pb-2 p-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="(creation) lg:text-[2vw]">{formatDateString(created)}</div>
        <div className="(d-day) lg:text-[1.8vw]">D-{dateDiffAsString(expire,new Date())}</div>
      </div>
      <ul className="px-2 overflow-hidden whitespace-nowrap">{item.getTags.map((tag)=>
        <li className="(tags) inline-block list-none mr-3 text-[#aaaaaa] lg:text-[1.3vw]" key={tag}>#{tag}</li>)}
      </ul>
      <div className="absolute"></div>
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
