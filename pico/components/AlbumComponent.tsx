import Image from "next/image";
import { StaticImageData } from "next/image";
import stacked from '@/public/assets/images/stacked.svg';
import { useRouter } from "next/router";
import Album from "@/templates/Album";

const ThumbNail = ({ src, len }: { src: StaticImageData, len:number }) => {
  return (
    <div className={`(frame) w-full aspect-square rounded-md overflow-hidden relative`}>
    <Image src={src} alt="pic" className="object-cover w-full h-full" />
    {len > 1 && <Image src={stacked} alt='mult' className="w-8 h-8 absolute bottom-4 right-4"/>}
  </div>
  );
};

const AlbumComponent= ({ item }: { item: Album }) => {
  const router = useRouter();
  return (
    <div className="(container) w-full aspect-[3/4]  p-2 relative cursor-pointer"
        onClick = {()=>{
            router.push({
            pathname: "/ImageView/[...userid]",
            query: { userid: 'arbitrary' },
          })
        }}
        >
        <div className="w-full h-full relative rounded-md bg-pico_lighter">
      <ThumbNail src={item.getImageURLs[0]} len={item.getImageURLs.length}/>
      </div>
    </div>
  );
};

export default AlbumComponent;
