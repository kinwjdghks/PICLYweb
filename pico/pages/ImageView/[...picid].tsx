import Image from "next/image";
import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";

const ImageView = () => {
  const urlList = [ex1, ex2, ex3];
  const imageList = urlList.map((url) => (
    <div className="w-screen h-screen flex justify-center align-middle snap-center relative">
      <Image src={url} alt={`${url}`} className="relative scale-90"></Image>
    </div>
  ));

  return (
    <div className="(background-will_be_replaced) w-screen h-screen absolute overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide">
      <div className="(backdrop) absolute w-full h-full bg-black opacity-20"></div>
      <div className="w-min flex relative z-10">
        {imageList}
      </div>
    </div>
    


  );
};

export default ImageView;