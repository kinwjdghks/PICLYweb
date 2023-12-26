//SSR code

// import Actionbar from "@/components/Gallery/ActionBar";
// import { useSetRecoilState } from "recoil";
// import { curAlbumState } from "@/lib/recoil/curAlbumState";
// import { useEffect } from "react";
// import { Album } from "@/templates/Album";
// import LoadingPage from "@/components/Loading";
// import dynamic from "next/dynamic";
// import { getAlbumByID, getImagesByID } from "@/lib/functions/functions";
// const PicoCarousel = dynamic(()=>import('@/components/ui/carousel'));

// const ImageView = ({ album }: { album: Album|null }) => {
//   console.log(album);
//   if(!album) return <LoadingPage/>

//   const setCurAlbum = useSetRecoilState(curAlbumState);

//   useEffect(() => {
//     if (album) {
//       setCurAlbum(album);
//     }
//   }, [album]);

//   return (
//     <div className="(background) w-screen h-screen absolute bg-black">
//       <PicoCarousel />
//       <Actionbar resetAlbum={() => {}} mode="guest" />
//     </div>
//   );
// };

// export async function getServerSideProps({ query }: { query: { albumID: string } }) {
//   const albumID = query.albumID as string;

//   try {
//     const album_: Album | undefined = await getAlbumByID(albumID);
//     const images: string[]|undefined = await getImagesByID(albumID);
    
//     if (album_ && images) {
//       const album:Album = {
//         albumID : album_.albumID,
//         ownerID : album_.ownerID,
//         creationTime : JSON.parse(JSON.stringify(album_.creationTime)),
//         expireTime : JSON.parse(JSON.stringify(album_.expireTime)),
//         tags : album_.tags || [],
//         images : images,
//         imageCount: album_.imageCount || 0,
//         viewCount : album_.viewCount || 0,
//       }
//       return {
//         props: { album } ,
//       };
//     }
//     else return { props: { album: null } }
//   } catch (error) {
//     console.error("Error fetching album:", error);
//     return { props: { album: null } };
//   }
// }

// export default ImageView;


//CSR code

// import Actionbar from "@/components/Gallery/ActionBar";
// import PicoCarousel from "@/components/ui/carousel";
// import { useSetRecoilState } from "recoil";
// import { curAlbumState } from "@/lib/recoil/curAlbumState";
// import { useRouter } from "next/router";
// import FallbackPage from "@/components/Fallback";
// import { Album } from "@/templates/Album";
// import { getAlbumByID, getImagesByID } from "@/lib/functions/functions";
// import { useEffect } from "react";

// const ImageView = () => {
//   const setCurAlbum = useSetRecoilState(curAlbumState);
//   const router = useRouter();
//   const albumID:string|undefined = router.query.albumID as string;
//   // console.log(albumID);
//   const getImages = async (albumID:string) => { 
//     let album: Album | undefined =  await getAlbumByID(albumID);
//     if(!album) return <FallbackPage/>;
//     const images = await getImagesByID(albumID);
//     album = {...album, images:images}; 
    
//     setCurAlbum(album);
//   };

//   useEffect(()=>{
//     getImages(albumID);
//   },[]);
  
//   return (
//     <div className="(background) w-screen h-screen absolute bg-black">
//       <PicoCarousel />
//       <Actionbar resetAlbum={() => {}} mode="guest" />
//     </div>
//   );
// };

// export async function getServerSideProps({param}:{param:string}) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

// export default ImageView;

//CSR+SSR

import Actionbar from "@/components/Gallery/ActionBar";
import { useSetRecoilState } from "recoil";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { useEffect } from "react";
import { Album } from "@/templates/Album";
import LoadingPage from "@/components/Loading";
import dynamic from "next/dynamic";
import { getAlbumByID, getImagesByID } from "@/lib/functions/functions";
const PicoCarousel = dynamic(()=>import('@/components/ui/carousel'));

const ImageView = ({ album }: { album: Album|null }) => {
  console.log(album);
  if(!album) return <LoadingPage/>

  const setCurAlbum = useSetRecoilState(curAlbumState);

  useEffect(() => {
    if (album) {
      setCurAlbum(album);
    }
  }, [album]);

  return (
    <div className="(background) w-screen h-screen absolute bg-black">
      <PicoCarousel />
      <Actionbar resetAlbum={() => {}} mode="guest" />
    </div>
  );
};

export async function getServerSideProps({ query }: { query: { albumID: string } }) {
  const albumID = query.albumID as string;

  try {
    const album_: Album | undefined = await getAlbumByID(albumID);
    const images: string[]|undefined = await getImagesByID(albumID);
    
    if (album_ && images) {
      const album:Album = {
        albumID : album_.albumID,
        ownerID : album_.ownerID,
        creationTime : JSON.parse(JSON.stringify(album_.creationTime)),
        expireTime : JSON.parse(JSON.stringify(album_.expireTime)),
        tags : album_.tags || [],
        images : images,
        imageCount: album_.imageCount || 0,
        viewCount : album_.viewCount || 0,
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