import Image from "next/image";
import { TbBoxMultiple } from "react-icons/tb";
import { Album } from "@/templates/Album";
import { formatDateString,dateDiffAsString } from "@/lib/functions/dateFormating";
import noImage from "@/public/assets/images/icons8-default-image-64.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const ThumbNail = ({ src, len, priority }: { src: string|StaticImport, len:number, priority?:boolean }) => {
  return (
    <div className={`(frame) w-full aspect-square rounded-t-md overflow-hidden relative`}>
      <div className="(gradient filter) absolute w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent to-40%"></div>
    {priority ? <Image src={src} alt="pic" width={0} height={0} sizes="100vw" className="object-cover w-full h-full"  draggable='false'  priority />
      :<Image src={src} alt="pic" width={0} height={0} sizes="100vw" className="object-cover w-full h-full"  draggable='false'/>}
    {len > 1 && <TbBoxMultiple className="lg:w-8 lg:h-8 w-6 h-6 absolute lg:bottom-4 lg:right-4 bottom-2 right-2"/>}
  </div>
  );
};


const AlbumComponent= ({ item, priority, selectAlbum }: { item: Album, priority?:boolean, selectAlbum:(album:Album)=>void }) => {
  // console.log('item:'+item);

  
  const Info = () =>{
    if(!item) return <></>
    const expire = item.expireTime;
    const difference:string = dateDiffAsString(new Date(expire),new Date());
    const impending:boolean = difference.length == 2 && difference[1] =='h';

    return <div className="(info) w-full aspect-[3/1] pb-2 lg:p-4 p-2 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="(creation) lg:text-[2vw]">{formatDateString(new Date(expire))}</div>
        <div className={`(d-day) lg:text-[1.8vw] ${impending && 'text-red-500'}`}>D-{difference}</div>
      </div>
      <ul className="overflow-hidden whitespace-nowrap">{item.tags.map((tag)=>
        <li className="(tags) inline-block list-none mr-3 text-[#aaaaaa] lg:text-[1.3vw]" key={tag}>#{tag}</li>)}
      </ul>
      <div className="absolute"></div>
    </div>
  }
  
  return (
    <div className="(container) w-full aspect-[3/4]  p-2 relative cursor-pointer" onClick = {()=>selectAlbum(item)}>
      <div className="w-full h-full relative rounded-md bg-pico_lighter">
        <ThumbNail src={item.thumbnailURL ?? noImage} len={item.imageCount} priority={priority && true}/>
        <Info/>
      </div>
    </div>
  );
};

export default AlbumComponent;
