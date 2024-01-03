import { poppins } from "@/public/assets/fonts/poppins";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiImageAddFill } from "react-icons/ri";

const GalleryHeader = ({ onChange, onModalOpen }: {onChange: (input: string) => void, onModalOpen: () => void }) => {
  const SearchButton = (): ReactNode => {
    //useState
    const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
    //useRef
    const inputRef = useRef<HTMLInputElement>(null);
    //useEffect
    useEffect(() => {
      if (isInputOpen === false) {
        if (inputRef.current) {
          inputRef.current.blur();
          inputRef.current.value = "";
          onChange("");
        }
      }
    }, [isInputOpen]);

    return (
      <>
        <FaSearch className="fill-white lg:w-8 lg:h-8 lg:m-4 w-6 h-6 m-2 translate-x-0 cursor-pointer"
          onClick={() => setIsInputOpen((prev) => !prev)}/>
        <input
          type="text"
          className={`absolute lg:translate-y-[140%] lg:h-12 translate-y-[130%] h-10 rounded-lg text-black text-xl  outline-none transition-all duration-300 ${
            isInputOpen ? "lg:w-80 w-1/2 pl-2 border-2" : "w-0 pl-0 border-0"
          } `}
          onChange={(e) => onChange(e.target.value)}
          ref={inputRef}
          placeholder={isInputOpen ? "#태그 검색" : ""}/>
      </>
    );
  };

  return (
    <div className="w-[inherit] lg:h-20 h-16 px-2 lg:px-[calc(15%-2rem)] fixed bg-pico_default flex items-center place-content-between">
      <div className={`lg:invisible w-max h-max pl-4  ${poppins.className} lg:text-[2.5rem] text-3xl font-[600] `}>
        PiCo
      </div>
      <div className=" flex justify-end items-center">
        <RiImageAddFill
          className="lg:m-4 lg:w-10 lg:h-10 m-2 w-8 h-8 cursor-pointer fill-white"
          onClick={onModalOpen}/>
        <HiOutlineMenu className="lg:w-0 lg:m-0 m-2 w-8 h-8" />
        <SearchButton />
      </div>
    </div>
  );
};

export default GalleryHeader;
