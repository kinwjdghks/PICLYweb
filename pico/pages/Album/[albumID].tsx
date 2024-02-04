// SSR
import Actionbar from "@/components/actions/ActionBar";
import { Album } from "@/templates/Album";
import dynamic from "next/dynamic";
import { getAlbumByID, updateViewCount } from "@/lib/functions/firebaseCRUD";
import FallbackPage from "@/components/page/FallbackPage";
import ExpiredPage from "@/components/page/ExpiredPage";
import { useBodyScrollLock } from "@/lib/functions/scrollLock";
import { useEffect } from "react";
const PicoCarousel = dynamic(()=>import('@/components/page/Carousel'));

const ImageView = ({ album, valid }: { album: Album|null, valid:boolean }) => {
  
  const { lockScroll, openScroll } = useBodyScrollLock();

  useEffect(()=>{
    lockScroll();
    return ()=>openScroll();
  },[]);

  if(!valid) return  <FallbackPage/>
  else if(!album) return <ExpiredPage/>

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
    
    if (album_){
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
    
      //increase viewCount
      updateViewCount(album_.albumID!,album_.viewCount+1);
      // console.log('viewCount updated to'+(+album_.viewCount+1));
      
      if(new Date(album_.expireTime).getTime() > new Date().getTime()){
        return {
          props: { album:album, valid:true } ,
        };
      }
      else return {
        props: { album:null, valid:true } ,
      }
    }
    else return { props: { album: null, valid: false } }
  } catch (error) {
    console.error("Error fetching album:", error);
    return { props: { album: null, valid: false } };
  }
}

export default ImageView;

export async function generateMetadata({ params }: {params: {albumID: string}}){
 
  let album:Album | undefined;
  try {
    album = await getAlbumByID(params.albumID);
  }catch(error){
    console.log(error);
  }

  if(album && new Date(album.expireTime).getTime() > new Date().getTime()) return {
    title: "PiCo Photo Sharing",
    openGraph: {
      images: album?.thumbnailURL
    }
  };

  else return {
    title: "PiCo Photo Sharing"
  }
}

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
