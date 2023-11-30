import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";
import Actionbar from "@/components/Gallery/ActionBar";
import PicoCarousel from "@/components/ui/carousel";
import Album from "@/templates/Album";
import { useSetRecoilState } from "recoil";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
//router that is shown to anonymous
const dummyalbum:Album = new Album('1',new Date(),[ex1,ex2,ex3],['tag1','tag2','veryverylongtag']);


const ImageView = () => {

  const setCurAlbum = useSetRecoilState(curAlbumState);
  setCurAlbum(dummyalbum);

  
  return (
    <div className="(background) w-screen h-screen absolute bg-black">
      <PicoCarousel/>
      <Actionbar resetAlbum={()=>{}} mode="guest"/>
    </div>
  );
};

export default ImageView;
