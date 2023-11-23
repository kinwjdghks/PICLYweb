import AlbumContainer from "@/components/albumContainer";
import { poppins } from "@/public/assets/fonts/poppins";
import Image from "next/image";
import search from "@/public/assets/images/search.svg";
import styles from "@/styles/icons.module.css";


const Header = () => {
    const transition = 'transition-[width] ease-in-out duration-[1000]';
  return (
    <div className="w-screen h-20 p-2 lg:px-64 fixed top-0 bg-pico_default flex items-center place-content-between z-[100]">
      <div className={`w-max h-max pl-4  ${poppins.className} text-[2.5rem] font-[600] `}>
        PiCo
      </div>
      <div className="w-1/2">
        {/* <Image src={search} alt="search" className="w-8 h-8 inline-block" /> */}
        <input
          className={`${styles.search} w-1/2 hover:w-full lg:hover:w-1/2 focus:w-full lg:focus:w-1/2 h-12 float-right border-solid border-[2px] p-2 px-4 m-1 bg-pico_darker border-pico_darker box-border rounded-md text-xl ${transition}`}
          type="text"
          placeholder="#태그 검색"
        />
      </div>
    </div>
  );
};


const AddPic = () =>{

  return <button className={`
  ${styles.addbtn}
   w-24 h-24 m-12 rounded-full bg-pico_darker fixed right-0 bottom-0 border-solid border-4 border-[#8cb4f3]`} onClick={(e)=>{e.preventDefault()}}></button>
}

const GalleryPage = () => {
  const media = "";
  return (
    <div
      className={
        media +
        "w-screen h-screen bg-pico_default flex justify-center overflow-y-scroll"
      }
    >
      <Header />
      <AlbumContainer />
      <AddPic/>
    </div>
  );
};

export default GalleryPage;
