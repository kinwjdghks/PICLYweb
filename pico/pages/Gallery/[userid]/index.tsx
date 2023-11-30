// import NewAlbumModal from "@/components/Gallery/newalbummodal";
import AlbumContainer from "@/components/AlbumContainer";
import { poppins } from "@/public/assets/fonts/poppins";
import styles from "@/styles/icons.module.css";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { useRecoilValue } from "recoil";
import PicoCarousel from "@/components/ui/carousel";
import Actionbar from "@/components/AlbumView/ActionBar";

//dynamic import component
const NewAlbumModal = dynamic(()=> import('@/components/Gallery/NewAlbumModal'),{
  ssr:false
})

const Header = ({onChange}:{onChange:(input:string)=>void}) => {

    const transition = 'transition-[width] ease-in-out duration-[1000]';
  return (
    <div className="w-screen h-20 p-2 lg:px-64 fixed top-0 bg-pico_default flex items-center place-content-between">
      <div className={`w-max h-max pl-4  ${poppins.className} text-[2.5rem] font-[600] `}>
        PiCo
      </div>
      <div className="w-1/2">
        {/* <Image src={search} alt="search" className="w-8 h-8 inline-block" /> */}
        <input
          className={`${styles.search} w-1/2 hover:w-full lg:hover:w-1/2 focus:w-full lg:focus:w-1/2 h-12 float-right border-solid border-[2px] p-2 px-4 m-1 bg-pico_darker border-pico_darker box-border rounded-md text-xl ${transition}`}
          type="text"
          placeholder="#태그 검색"
          onChange={(e)=>onChange(e.target.value)}
        />
      </div>
    </div>
  );
};


const AddPic = ({open}:{open:()=>void}) =>{

  return <button className={`
  ${styles.addbtn}
   w-24 h-24 m-12 rounded-full bg-pico_darker fixed right-0 bottom-0 border-solid border-4 border-[#8cb4f3] hover:scale-[110%]`} 
   onClick={(e)=>{e.preventDefault();open()}}></button>
}

const GalleryPage = () => {
  const [newAlbumModalopen,setNewAlbumModalopen] = useState<boolean>(false);
  const [albumViewOpen,setAlbumViewOpen] = useState<boolean>(false);
  const [tagSearchInput,setTagSearchInput] = useState<string>('');
  const curAlbum = useRecoilValue(curAlbumState);

  console.log(curAlbum);

  
  return (
    <div className={"w-screen h-screen bg-pico_default flex justify-center overflow-y-scroll scrollbar-hide"}>
      <AlbumContainer tagInput={tagSearchInput} />
      <Header onChange={(input:string)=>setTagSearchInput(input)}/>
      <AddPic open={()=>setNewAlbumModalopen(true)}/>
      {newAlbumModalopen && <NewAlbumModal close={()=>setNewAlbumModalopen(false)}/>}
      {curAlbum && <>
        <PicoCarousel/>
        <Actionbar/>
        </>}
    </div>
  );
};

export default GalleryPage;
