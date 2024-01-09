// SSR

import Actionbar from "@/components/actions/ActionBar";
import { Album } from "@/templates/Album";
import LoadingPage from "@/components/page/LoadingPage";
import dynamic from "next/dynamic";
import { getAlbumByID } from "@/lib/functions/firebaseCRUD";
const PicoCarousel = dynamic(()=>import('@/components/page/Carousel'));

const ImageView = ({ album }: { album: Album|null }) => {
  console.log(album);
  if(!album) return <LoadingPage/>

  return (
    <div className="(background) w-screen h-screen absolute bg-black">
      <PicoCarousel album={album} />
      <Actionbar resetAlbum={() => {}} mode="guest" album={album} deleteAlbum={()=>{}} />
    </div>
  );
};

export async function getServerSideProps({ query }: { query: { albumID: string } }) {
  const albumID = query.albumID as string;

  try {
    const album_: Album | undefined = await getAlbumByID(albumID);
    
    if (album_) {
      const album:Album = {
        albumID : album_.albumID,
        ownerID : album_.ownerID,
        creationTime : JSON.parse(JSON.stringify(album_.creationTime)),
        expireTime : JSON.parse(JSON.stringify(album_.expireTime)),
        tags : album_.tags || [],
        thumbnailURL : album_.thumbnailURL || '',
        imageURLs : album_.imageURLs || [],
        imageCount: album_.imageCount || 0,
        viewCount : album_.viewCount || 0,
        imageSizes: album_.imageSizes || [],
      }
      return {
        props: { album } ,
      };
    }
    else return { props: { album: null } }
  } catch (error) {
    console.error("Error fetching album:", error);
    return { props: { album: null } };
  }
}

export default ImageView;


//CSR

// import Actionbar from "@/components/actions/ActionBar";
// import Carousel from "@/components/page/Carousel";
// import { useRouter } from "next/router";
// import FallbackPage from "@/components/page/FallbackPage";
// import { Album } from "@/templates/Album";
// import { getAlbumByID } from "@/lib/functions/firebaseCRUD";
// import { useEffect, useState } from "react";
// import LoadingPage from "@/components/page/LoadingPage";
// import { useBodyScrollLock } from "@/lib/functions/scrollLock";
// import ExpiredPage from "@/components/page/ExpiredPage";

// const ImageView = () => {
  
//   //router
//   const router = useRouter();

//   //constants
//   const albumID:string|undefined = router.query.albumID as string;

//   //useState
//   const [curAlbum,setCurAlbum] = useState<Album|undefined>(undefined);
//   const [isLoading,setIsLoading] = useState<boolean>(true);

//   //useEffect
//   useEffect(()=>{
//     getAlbum(albumID);
//     lockScroll();
//     return ()=>{
//       openScroll()};
//   },[]);
  
//   //functions
//   const { lockScroll, openScroll } = useBodyScrollLock();

//   const getAlbum = async (albumID:string) => { 
//     let album: Album | undefined = await getAlbumByID(albumID);
//     // console.log(album);
//     setCurAlbum(album);
//     setIsLoading(false);
//   };
  
//   if(isLoading) return <LoadingPage/>
//   else if(!isLoading && !curAlbum) return <FallbackPage/>
//   else if(!isLoading && curAlbum!.expireTime.getTime() < new Date().getTime()) return <ExpiredPage/>
//   else return (
//     <div className="(background) w-screen h-screen absolute bg-black">
//       <Carousel album={curAlbum!}/>
//       <Actionbar resetAlbum={() => {}} mode="guest" album={curAlbum!} deleteAlbum={()=>{}}/>
//     </div>
//   );
// };

// export async function getServerSideProps({param}:{param:string}) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

// export default ImageView;
