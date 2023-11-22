import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";
import PicoCarousel from "@/components/ui/carousel";

const ImageView = () => {
  const dummypics = [
    {
        src:ex1,
        key:1,
    },
    {
        src:ex2,
        key:2,
    },
    {
        src:ex3,
        key:3,
    }
  ]


  return (
    <div className="(background-will_be_replaced) w-screen h-screen absolute bg-black">
      <PicoCarousel pics={dummypics}/>
    </div>
    


  );
};

export default ImageView;