// import NewAlbumModal from "@/components/Gallery/newalbummodal";
import Modal from "./ui/Modal";
import { poppins } from "@/public/assets/fonts/poppins";
import dynamic from "next/dynamic";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Actionbar from "@/components/Gallery/ActionBar";
import { useRouter } from "next/router";
import { Album } from "@/templates/Album";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiImageAddFill } from "react-icons/ri";
import { auth, db, storage } from "@/lib/firebase/firebase";
import { _user_ } from "@/templates/user";
import { useBodyScrollLock } from "@/lib/functions/scrollLock";
import AlbumContainer from "./AlbumContainer";
import { getAllAlbumsByID } from "@/lib/functions/dataFetch";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

//dynamic import component
const NewAlbumModal = dynamic(()=> import('@/components/Gallery/NewAlbumModal'));
const PicoCarousel = dynamic(()=>import('@/components/carousel'));

const Header = ({onChange,onModalOpen}:{onChange:(input:string)=>void,onModalOpen:()=>void}) => {

    const [isInputOpen,setIsInputOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
        if(isInputOpen === false){
            if(inputRef.current){
                inputRef.current.blur();
                inputRef.current.value = '';
                onChange('');
            }
        }

    },[isInputOpen]);
  return (
    <div className="w-[inherit] h-20 px-2 lg:px-[10%] fixed bg-pico_default flex items-center place-content-between">  
    <div className={`lg:invisible w-max h-max pl-4  ${poppins.className} text-[2.5rem] font-[600] `}>
        PiCo
      </div>
      <div className=" flex justify-end items-center">
        <RiImageAddFill className="lg:m-4 lg:w-10 lg:h-10 m-2 w-8 h-8 cursor-pointer fill-white" onClick={onModalOpen}/>
        <HiOutlineMenu className="lg:w-0 lg:m-0 m-2 w-8 h-8"/>
        <FaSearch className='fill-white lg:w-8 lg:h-8 lg:m-4 w-6 h-6 m-2 translate-x-0 cursor-pointer' onClick={()=>setIsInputOpen((prev)=>!prev)}/>
        <input type='text'
        className={`absolute lg:translate-y-[150%] lg:h-12 translate-y-[130%] h-10 rounded-lg text-black text-xl  outline-none  transition-all duration-300 ${isInputOpen ? 'lg:w-80 w-1/2 pl-2 border-2' : 'w-0 pl-0 border-0'} `}
        onChange={(e)=>onChange(e.target.value)} 
        ref={inputRef}
        placeholder={isInputOpen ? "#태그 검색" : ''}/>
      </div>
    </div>
  );
};

type AlbumDisplayPageProps={
  userAlbumList:Album[]|undefined;
  setUserAlbumList:Dispatch<SetStateAction<Album[] | undefined>>
}

const AlbumDisplayPage = ({userAlbumList,setUserAlbumList}:AlbumDisplayPageProps) => {
  const [newAlbumModalopen,setNewAlbumModalopen] = useState<boolean>(false);
  const [tagSearchInput,setTagSearchInput] = useState<string>('');
  const [displayingAlbum,setDisplayingAlbum] = useState<Album|undefined>(undefined)
  const { lockScroll, openScroll } = useBodyScrollLock();

  // useEffect(()=>{
  //   console.log(userAlbumList)
  // },[userAlbumList]);
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

  useEffect(()=>{
    console.log('useEffect authchange')
    auth.onAuthStateChanged((user)=>{
      if(user){
        getAllAlbumsByID_(user.uid);
        setDisplayingAlbum(undefined);
        
      }else{
        router.push('/');
      return;
      }
    });
  },[])

  const getAllAlbumsByID_ = async (uid:string) =>{
    const albumList = await getAllAlbumsByID(uid);
        setUserAlbumList(albumList);
  }

  const addNewAlbum = (newAlbum:Album) =>{
    if(!userAlbumList) setUserAlbumList([newAlbum]);
    else setUserAlbumList((prev)=>[newAlbum, ...prev!]);
  }

  const deleteAlbum = async () => {
    if (!userAlbumList || !displayingAlbum) return;
  
    const albumID = displayingAlbum.albumID;
    const imageURLs:string[] = displayingAlbum.imageURLs.map((album,idx)=> `${albumID}/${idx}.jpeg`);
    imageURLs.push(`${albumID}/thumbnail.jpeg`);

    try {
      // Delete each image from Cloud Storage
      const deleteImagePromises = imageURLs.map(async (imageURL) => {
        const imageRef = ref(storage, imageURL);
        await deleteObject(imageRef);
      });
  
      // Wait for all image deletions to complete
      await Promise.all(deleteImagePromises);
  
      // Delete the album document from Firestore
      const albumRef = doc(db, 'Albums', albumID);
      await deleteDoc(albumRef);
  
      // Update the userAlbumList and reset displayingAlbum
      const newUserAlbumList = userAlbumList.filter((album) => album.albumID !== albumID);
      setUserAlbumList(newUserAlbumList);
      setDisplayingAlbum(undefined);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
    if(displayingAlbum || newAlbumModalopen) lockScroll();
    else openScroll();
  },[displayingAlbum,newAlbumModalopen])
  return (
    <div className={"lg:w-[calc(100%-16rem)] w-screen h-screen relative bg-pico_default flex justify-center overflow-y-scroll scrollbar-hide"}>
      <AlbumContainer userAlbumList={userAlbumList} tagInput={tagSearchInput} selectAlbum={setDisplayingAlbum} />
      <Header onChange={(input:string)=>setTagSearchInput(input)} onModalOpen={()=>setNewAlbumModalopen(true)}/>
      {newAlbumModalopen && <NewAlbumModal close={()=>setNewAlbumModalopen(false)} refresh={addNewAlbum}/>}
      {displayingAlbum && <Modal><>
        <PicoCarousel album={displayingAlbum}/>
        <Actionbar resetAlbum={()=>setDisplayingAlbum(undefined)} album={displayingAlbum} mode="user" deleteAlbum={deleteAlbum}/>
        </></Modal>}
    </div>
  );
};

export default AlbumDisplayPage;