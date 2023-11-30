import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";
import Actionbar from "@/components/AlbumView/ActionBar";
import PicoCarousel from "@/components/ui/carousel";
import Album from "@/templates/Album";
//router that is shown to anonymous
const dummyalbum = new Album('1',new Date,[ex1,ex2,ex3],['tag1','tag2']);


const ImageView = () => {
  
  return (
    <div className="(background) w-screen h-screen absolute bg-black">
      <PicoCarousel/>
      <Actionbar/>
    </div>
  );
};

export default ImageView;
