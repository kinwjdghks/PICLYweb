import { poppins } from "@/public/assets/fonts/poppins";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiImageAddFill } from "react-icons/ri";

export const HEADER_HEIGHT = `lg:h-[5rem] h-[4rem]`;
const GalleryHeader = ({ setIsInputOpen, onModalOpen, setMobileMenuOpen }: {setIsInputOpen: Dispatch<SetStateAction<boolean>>, onModalOpen: () => void, setMobileMenuOpen: Dispatch<SetStateAction<boolean|undefined>> }) => {
  

  const SearchButton = (): ReactNode => {

    return <FaSearch className="fill-white lg:w-8 lg:h-8 lg:m-4 w-6 h-6 m-2 translate-x-0 cursor-pointer"
          onClick={() => setIsInputOpen((prev) => !prev)}/>
  };

  return (
    <div className={`w-[inherit] ${HEADER_HEIGHT} px-2 lg:px-[calc(15%-2rem)] fixed bg-pico_default flex items-center place-content-between`}>
      <div className={`lg:invisible w-max h-max pl-4  ${poppins.className} lg:text-[2.5rem] text-3xl font-[600] `}>
        PiCo
      </div>
      <div className=" flex justify-end items-center">
        <RiImageAddFill className="lg:m-4 lg:w-10 lg:h-10 m-2 w-8 h-8 cursor-pointer fill-white"
          onClick={onModalOpen}/>
        <HiOutlineMenu className="lg:w-0 lg:m-0 m-2 w-8 h-8"
          onClick={()=>setMobileMenuOpen(true)} />
        <SearchButton />
      </div>
    </div>
  );
};

export default GalleryHeader;
