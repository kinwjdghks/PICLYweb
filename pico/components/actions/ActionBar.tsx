import Link from "next/link";
import { poppins } from "@/public/assets/fonts/poppins";
import { useState,ReactNode } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { BsLink45Deg } from "react-icons/bs";
import { Album } from "@/templates/Album";
import PopupMessage from "../modal/PopupMessage";
import { copyURL } from "@/lib/functions/copyURL";
import AlertMessage from "../modal/AlertMessage";

const MenuBar = ({
  isMenuOpen,
  deleteAlbum,
  menuClose,
}: {
  isMenuOpen: Boolean;
  deleteAlbum: () => void;
  menuClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listClassName = "w-full text-right text-center hover:underline underline-offset-8 items-center lg:text-2xl text-[1.3rem]";

  return isMenuOpen ? (
    <ul className={`w-30 h-max absolute lg:top-28 top-16 lg:right-0 -right-8 p-10 pt-0 leading-[2.5rem] text-right  text-[#aaaaaa]} lg:bg-transparent bg-gradient-to-bl from-black to-transparent lg:from-transparent`}>
      <li>
        <button
          className={`${listClassName} ${isLoading && "cursor-default"}`}
          onClick={
            isLoading
              ? () => {}
              : () => {
                  setIsLoading(true);
                  deleteAlbum();
                }
          }>
          {isLoading ? "삭제 중..." : "앨범 삭제"}
        </button>
      </li>
      <li>
        <button className={listClassName} onClick={menuClose}>
          취소
        </button>
      </li>
      <div className="bg-gradient-to-b via-80%"></div>
    </ul>
  ) : (
    <></>
  );
};

const Actionbar = ({resetAlbum, mode, album, deleteAlbum } : { resetAlbum: () => void, mode: "user" | "guest", album: Album, deleteAlbum: () => void }) => {
  //useState
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
  const [showcopymsg, setShowcopymsg] = useState<boolean>(false);

  //constants
  const user: Boolean = mode == "user";

  //components
  const URLCopyButton = ():ReactNode =>{
    return (
    <div onClick={()=>setShowcopymsg(true)} className="ml-auto relative">
      <PopupMessage className="fixed top-20 left-1/2 -translate-x-1/2"
        show={showcopymsg} 
        setShow={setShowcopymsg} 
        ellapseTime={1200} 
        callback={()=>copyURL(album.albumID)}>
       <AlertMessage>링크가 복사되었습니다.</AlertMessage>
      </PopupMessage>
      <BsLink45Deg className="lg:w-11 lg:h-11 w-9 h-9 m-2 cursor-pointer hover:scale-[115%] " />
    </div>)
  }
  
  return (
    <div className={`(actionbar) w-screen h-max fixed flex items-center top-0 lg:p-12 p-4 pt-2 ${poppins.className} z=[102]`}>
      {!user && (
        <Link
          href={"/"}
          className="w-max h-max font-bold text-2xl"
          onClick={resetAlbum}>
          PiCo
        </Link>)}

      {user && (
        <>
        <IoIosClose
          className="w-14 h-14 top-0 left-0 cursor-pointer fill-white"
          onClick={resetAlbum}/>

        <URLCopyButton/>
        
        <HiOutlineMenu
          className="lg:w-10 lg:h-10 w-8 h-8 m-2 cursor-pointer hover:scale-[115%] relative"
          onClick={(e: Event) => {
            e.preventDefault();
            setisMenuOpen((prev) => !prev);
          }}/>

        <MenuBar
          isMenuOpen={isMenuOpen}
          deleteAlbum={deleteAlbum}
          menuClose={() => {
            setisMenuOpen(false);
            }}/>
        </>)}
    </div>
  );
};

export default Actionbar;
