import Image from "next/image";
import noImage from "@/public/assets/images/icons8-default-image-64.png";
import { TbBoxMultiple } from "react-icons/tb";
import { Album } from "@/templates/Album";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { BsLink45Deg } from "react-icons/bs";
import { copyURL } from "@/lib/functions/copyURL";
import { dateDiffAsString, formatDateString } from "@/lib/functions/dateFunctions";


const ThumbNail = ({ src, len, alertCopyMsg, albumID, priority }: { src: string|StaticImport, len:number,alertCopyMsg:()=>void,albumID:string, priority?:boolean }) => {

  const URLButtonClickHandler =(e:React.MouseEvent) =>{
    e.stopPropagation();
    alertCopyMsg();
    copyURL(albumID);
  }

  return (
    <div className={`(frame) w-full aspect-square rounded-t-md overflow-hidden relative`}>
      <div className="(gradient filter) absolute w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent to-40%"></div>
      <Image src={src} alt="pic" width={0} height={0} sizes="100vw" className="object-cover w-full h-full"  draggable='false' priority={priority}/>
      <BsLink45Deg className='lg:w-10 lg:h-10 w-8 h-8 absolute lg:top-3 lg:right-3 top-1 right-1 opacity-70'
        onClick={URLButtonClickHandler}/>
      {len > 1 && <TbBoxMultiple className="lg:w-8 lg:h-8 w-6 h-6 absolute lg:top-4 lg:left-4 top-2 left-2 opacity-70"/>}
    </div>
  );
};

const AlbumComponent= ({ item, priority, selectAlbum,alertCopyMsg }: { item: Album, priority?:boolean, selectAlbum:(album:Album)=>void,alertCopyMsg:()=>void }) => {

  const Info = () =>{
    if(!item) return <></>
    const expire = item.expireTime;
    const difference:string = dateDiffAsString(new Date(),new Date(expire));
    const impending:boolean = difference.length == 2 && difference[1] =='h' || difference === '만료';

    return <div className="(info) w-full aspect-[3/1] relative pb-2 lg:p-4 p-2 flex flex-col justify-between">
      <div className="flex justify-between text-[3.5vw]">
        <div className="(creation) lg:text-[2vw]">{formatDateString(new Date(expire))}</div>
        <div className={`(d-day) lg:text-[1.8vw] ${impending && 'text-red-500'}`}>{difference}</div>
      </div>
      <ul className="overflow-hidden whitespace-nowrap">{item.tags.map((tag)=>
        <li className="(tags) inline-block list-none mr-3 text-[#aaaaaa] lg:text-[1.3vw]" key={tag}>#{tag}</li>)}
      </ul>
      <div className="absolute"></div>
    </div>
  }
  
  return (
    <div className="(container) w-full aspect-[3/4]  p-2 relative cursor-pointer" 
      onClick = {()=>selectAlbum(item)}>
      <div className="w-full h-full relative rounded-md bg-picly_lighter">
        <ThumbNail src={item.thumbnailURL ?? noImage} len={item.imageCount} alertCopyMsg={alertCopyMsg} albumID={item.albumID!} priority={priority && true}/>
        <Info/>
      </div>
    </div>
  );
};

export default AlbumComponent;
