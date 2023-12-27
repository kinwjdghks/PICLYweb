// import NewAlbumModal from "@/components/Gallery/newalbummodal";
import AlbumContainer from "./AlbumContainer";
import { poppins } from "@/public/assets/fonts/poppins";
import dynamic from "next/dynamic";
import {useEffect, useRef, useState} from "react";
import Actionbar from "@/components/Gallery/ActionBar";
import { useRouter } from "next/router";
import { Album } from "@/templates/Album";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { RiImageAddFill } from "react-icons/ri";
import { auth, db } from "@/lib/firebase/firebase";
import { _user_ } from "@/templates/user";
import { useBodyScrollLock } from "@/lib/functions/scrollLock";

//dynamic import component
const NewAlbumModal = dynamic(()=> import('@/components/Gallery/NewAlbumModal'));
const PicoCarousel = dynamic(()=>import('@/components/carousel'));

const Header = ({onChange,onModalOpen}:{onChange:(input:string)=>void,onModalOpen:()=>void}) => {

    const [isOpen,setIsOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
        if(isOpen === false){
            if(inputRef.current){
                inputRef.current.blur();
                inputRef.current.value = '';
                onChange('');
            }
        }

    },[isOpen]);
  return (
    <div className="w-[inherit] h-20 px-2 lg:px-[10%] fixed bg-pico_default flex items-center place-content-between">  
    <div className={`lg:invisible w-max h-max pl-4  ${poppins.className} text-[2.5rem] font-[600] `}>
        PiCo
      </div>
      <div className=" flex justify-end items-center">
        <RiImageAddFill className="lg:m-4 lg:w-10 lg:h-10 m-2 w-8 h-8 cursor-pointer fill-white" onClick={onModalOpen}/>
        <HiOutlineMenu className="lg:w-0 lg:m-0 m-2 w-8 h-8"/>
        <FaSearch className='fill-white lg:w-8 lg:h-8 lg:m-4 w-6 h-6 m-2 translate-x-0' onClick={()=>setIsOpen((prev)=>!prev)}/>
        <input type='text'
        className={`absolute lg:translate-y-[150%] lg:h-12 translate-y-[130%] h-10 rounded-lg text-black text-xl pl-2 outline-none border-2 transition-all duration-300 ${isOpen ? 'lg:w-80 w-1/2' : 'w-0 pl-0 border-0'} `}
        onChange={(e)=>onChange(e.target.value)} 
        ref={inputRef}
        placeholder={isOpen ? "#태그 검색" : ''}/>
      </div>
    </div>
  );
};

const AlbumDisplayPage = () => {
  const [newAlbumModalopen,setNewAlbumModalopen] = useState<boolean>(false);
  const [tagSearchInput,setTagSearchInput] = useState<string>('');
  const [userAlbumList,setUserAlbumList] = useState<Album[]|undefined>(undefined);
  const [displayingAlbum,setDisplayingAlbum] = useState<Album|undefined>(undefined);
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
        getAllAlbumsByID(user.uid);
        setDisplayingAlbum(undefined);
        
      }else{
        router.push('/');
      return;
      }
    });
  },[])


  const getAllAlbumsByID = async (uid:string) =>{
    console.log("getAllAlbumsByID executed");
    const albumQuery = query(collection(db, 'Albums'), where('ownerID', '==', uid),orderBy('creationTime','desc'));
    
    try {
      const querySnapshot = await getDocs(albumQuery);
  
      const fetchAlbum:Promise<Album>[] = querySnapshot.docs.map(async (doc) => {
        const albumData = doc.data();
  
        const album: Album = {
          albumID: doc.id || '',
          ownerID: albumData.ownerID || '',
          creationTime: albumData.creationTime.toDate(),
          expireTime: albumData.expireTime.toDate(),
          tags: albumData.tags || [],
          thumbnailURL: albumData.thumbnailURL || '',
          imageURLs: albumData.imageURLs || [],
          imageCount: albumData.imageCount || 0,
          viewCount: albumData.viewCount || 0,
        };
  
        return album;
      });
      const userAlbums:Album[] = await Promise.all(fetchAlbum);
      setUserAlbumList(userAlbums);
    } catch (error) {
      console.error(error);
      setUserAlbumList([]);
    }
  }

  const refresh = (newAlbum:Album) =>{
    if(!userAlbumList) setUserAlbumList([newAlbum]);
    else setUserAlbumList((prev)=>[newAlbum, ...prev!]);
  }
  
  useEffect(()=>{
    if(displayingAlbum || newAlbumModalopen) lockScroll();
    else openScroll();
  },[displayingAlbum,newAlbumModalopen])
  return (
    <div className={"lg:w-[calc(100%-16rem)] w-screen h-screen relative bg-pico_default flex justify-center overflow-y-scroll scrollbar-hide"}>
      <AlbumContainer userAlbumList={userAlbumList} tagInput={tagSearchInput} selectAlbum={setDisplayingAlbum} />
      <Header onChange={(input:string)=>setTagSearchInput(input)} onModalOpen={()=>setNewAlbumModalopen(true)}/>s
      {newAlbumModalopen && <NewAlbumModal close={()=>setNewAlbumModalopen(false)} refresh={refresh}/>}
      {displayingAlbum && <>
        <PicoCarousel album={displayingAlbum}/>
        <Actionbar resetAlbum={()=>setDisplayingAlbum(undefined)} album={displayingAlbum} mode="user"/>
        </>}
    </div>
  );
};

export default AlbumDisplayPage;