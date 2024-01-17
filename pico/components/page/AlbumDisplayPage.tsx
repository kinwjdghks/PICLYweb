// import NewAlbumModal from "@/components/Gallery/newalbummodal";
import Modal from "../modal/Modal";
import dynamic from "next/dynamic";
import {Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import Actionbar from "@/components/actions/ActionBar";
import { useRouter } from "next/router";
import { Album } from "@/templates/Album";
import { auth } from "@/lib/firebase/firebase";
import { _user_ } from "@/templates/user";
import { useBodyScrollLock } from "@/lib/functions/scrollLock";
import AlbumsContainer from "../container/AlbumsContainer";
import { deleteAlbum, getAllAlbumsByID } from "@/lib/functions/firebaseCRUD";
import GalleryHeader from "../container/GalleryHeader";
import PageFrame from "./PageFrame";
//dynamic import component
const NewAlbumModal = dynamic(()=> import('@/components/modal/NewAlbumModal'));
const Carousel = dynamic(()=>import('@/components/page/Carousel'));

type AlbumDisplayPageProps={
  userAlbumList:Album[]|undefined;
  setUserAlbumList:Dispatch<SetStateAction<Album[] | undefined>>
  setMobileMenuOpen: Dispatch<SetStateAction<boolean|undefined>>
}

const AlbumDisplayPage = ({userAlbumList,setUserAlbumList,setMobileMenuOpen}:AlbumDisplayPageProps) => {
  //useState
  const [newAlbumModalopen,setNewAlbumModalopen] = useState<boolean>(false);
  const [tagSearchInput,setTagSearchInput] = useState<string>('');
  const [displayingAlbum,setDisplayingAlbum] = useState<Album|undefined>(undefined);
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  //useRef
  const inputRef = useRef<HTMLInputElement>(null);

  //router
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === "Escape") {
        setDisplayingAlbum(undefined);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setDisplayingAlbum]);
  
  useEffect(() => {
    console.log('useEffect authchange');
    auth.onAuthStateChanged((user) => {
      if (user) {
        getAllAlbumsByID_(user.uid);
        setDisplayingAlbum(undefined);
      } else {
        router.push('/');
        return;
      }
    });
  },[]);

  useEffect(()=>{
    if(displayingAlbum || newAlbumModalopen) lockScroll();
    else openScroll();
  },[displayingAlbum,newAlbumModalopen]);

  useEffect(() => {
    if (isInputOpen === false) {
      if (inputRef.current) {
        inputRef.current.blur();
        inputRef.current.value = "";
        setTagSearchInput("");
      }
    }
  }, [isInputOpen]);

  //functions
  const { lockScroll, openScroll } = useBodyScrollLock();

  const getAllAlbumsByID_ = async (uid:string) =>{
    const albumList = await getAllAlbumsByID(uid);
    setUserAlbumList(albumList);
  }

  const addNewAlbum = (newAlbum:Album) =>{
    if(!userAlbumList) setUserAlbumList([newAlbum]);
    else setUserAlbumList((prev)=>[newAlbum, ...prev!]);
  }

  const onDeleteAlbum = async () => {
    if (!userAlbumList || !displayingAlbum) return;
  
    const albumID = displayingAlbum.albumID;
    
    try {
      await deleteAlbum(displayingAlbum);
  
      // Update the userAlbumList and reset displayingAlbum
      const newUserAlbumList = userAlbumList.filter((album) => album.albumID !== albumID);
      setUserAlbumList(newUserAlbumList);
      setDisplayingAlbum(undefined);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <PageFrame className={"(AlbumDisplayPage) lg:w-[calc(100%-16rem)] w-screen relative bg-pico_default flex overflow-y-scroll scrollbar-hide"}>
      <AlbumsContainer 
        userAlbumList={userAlbumList} 
        tagInput={tagSearchInput} 
        selectAlbum={setDisplayingAlbum} />
        
      <GalleryHeader
        setIsInputOpen={setIsInputOpen} 
        onModalOpen={()=>setNewAlbumModalopen(true)}
        setMobileMenuOpen={setMobileMenuOpen} />

      {newAlbumModalopen && <NewAlbumModal close={()=>setNewAlbumModalopen(false)} refreshWithNewAlbum={addNewAlbum}/>}
      
      <input
          type="text"
          className={`fixed lg:h-12 h-10 lg:top-4 top-3 lg:right-[calc(15%+8rem)] right-14 rounded-lg text-black lg:text-xl text-md outline-none transition-all duration-300 z-[100] ${
            isInputOpen ? "lg:w-80 w-[calc(100%-10rem)] pl-2 border-2" : "w-0 pl-0 border-0"
          } `}
          onChange={(e) => setTagSearchInput(e.target.value)}
          ref={inputRef}
          placeholder={isInputOpen ? "#태그 검색" : ""}/>

      {displayingAlbum 
        && <Modal>
          <>
            <Carousel album={displayingAlbum}/>
            <Actionbar 
            resetAlbum={()=>setDisplayingAlbum(undefined)} 
            album={displayingAlbum} 
            mode="user" 
            deleteAlbum={onDeleteAlbum}/>
          </>
        </Modal>}
    </PageFrame>
  );
};

export default AlbumDisplayPage;