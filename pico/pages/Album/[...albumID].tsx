import Actionbar from "@/components/Gallery/ActionBar";
import PicoCarousel from "@/components/ui/carousel";
import { useSetRecoilState } from "recoil";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase/firebase";
import { getDoc,doc } from "firebase/firestore";
import { storage } from "@/lib/firebase/firebase";
import { ref,listAll, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import Album from "@/templates/Album";
//router that is shown to anonymous



const ImageView = () => {
  const router = useRouter();
  const albumID = router.query.albumID?.[0];
  if(!albumID) console.log("albumID doesn't exist");
  const setCurAlbum = useSetRecoilState(curAlbumState);

  const getAlbumInfo = async () => {
    if(!albumID) return;
    const albumSRef = ref(storage, albumID);
    console.log(albumID)
    const albumRef = doc(db,'Albums',albumID);
    const dataList = await listAll(albumSRef);

    let album:Album;

    //get Album
    const getAlbum = await getDoc(albumRef);
    if(getAlbum.exists()){
      album = new Album(
        getAlbum.get('albumURL') as string,
        getAlbum.get('creationTime') as Date,
        getAlbum.get('expireTime') as Date,
        getAlbum.get('tags') as string[],
        [],
        getAlbum.get('viewCount') as number
      );
    }
    else{
      console.log("Album not found");
      return;
    }

    //get imageURLs
    const imageURLs = await Promise.all(
      dataList.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return downloadURL;
      })
    );
    album.editImageURLs= imageURLs;
    setCurAlbum(album);
    console.log('curAlbum set');
  };

  useEffect(()=>{
    console.log('flagss')
    getAlbumInfo();
  },[])  

  return (
    <div className="(background) w-screen h-screen absolute bg-black">
      <PicoCarousel/>
      <Actionbar resetAlbum={()=>{}} mode="guest"/>
    </div>
  );
};

export async function getServerSideProps({ params: { albumID } }: { params: { albumID: string } }) {
  return {
      props: {},
  };
}

export default ImageView;
