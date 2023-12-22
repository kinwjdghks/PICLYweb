import Actionbar from "@/components/Gallery/ActionBar";
import { useSetRecoilState } from "recoil";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { useEffect } from "react";
import Album, { Album_t } from "@/templates/Album";
import { getEntireAlbum as getEntireAlbum_ } from "@/lib/functions/functions";
import LoadingPage from "@/components/Loading";
import dynamic from "next/dynamic";
const PicoCarousel = dynamic(()=>import('@/components/ui/carousel'));

const ImageView = ({ albumData }: { albumData: Album_t|null }) => {
  console.log(albumData);
  if(!albumData) return <LoadingPage/>

  const album = new Album(albumData);
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
    const album_: Album | undefined = await getEntireAlbum_(albumID);
    // console.log(album_);
    if (album_) {
      const albumData:Album_t = {
        albumID : album_.getAlbumID,
        creationTime : JSON.parse(JSON.stringify(album_.getCreationTime)),
        expireTime : JSON.parse(JSON.stringify(album_.getExpireTime)),
        tags : album_.getTags || [],
        viewCount : album_.getViewCount || 0,
      }
      return {
        props: { albumData } ,
      };
    }
    else return { props: { albumData:null } }
  } catch (error) {
    console.error("Error fetching album:", error);
    return { props: { albumData:null } };
  }
}

export default ImageView;

// import Actionbar from "@/components/Gallery/ActionBar";
// import PicoCarousel from "@/components/ui/carousel";
// import { useSetRecoilState } from "recoil";
// import { curAlbumState } from "@/lib/recoil/curAlbumState";
// import { useRouter } from "next/router";
// import { getEntireAlbum as getEntireAlbum_ } from "@/lib/functions/functions";
// import FallbackPage from "@/components/Fallback";
// import Album from "@/templates/Album";

// const ImageView = () => {
//   const setCurAlbum = useSetRecoilState(curAlbumState);
//   const router = useRouter();
//   const albumID:string|undefined = router.query.albumID as string;
//   // console.log(albumID);
//   const getEntireAlbum = async (albumID:string) => {
//     const album: Album | undefined =  await getEntireAlbum_(albumID)
//     if(!album) return <FallbackPage/>
//     setCurAlbum(album);
//   };
//   getEntireAlbum(albumID);
  
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