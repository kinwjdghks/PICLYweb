// import NewAlbumModal from "@/components/Gallery/newalbummodal";
import AlbumContainer from "@/components/AlbumContainer";
import { poppins } from "@/public/assets/fonts/poppins";
import styles from "@/styles/icons.module.css";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import Actionbar from "@/components/Gallery/ActionBar";
import { useRouter } from "next/router";
import { Album } from "@/templates/Album";
import { IoPersonSharp } from "react-icons/io5";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";
import { _user_ } from "@/templates/user";

//dynamic import component
const NewAlbumModal = dynamic(()=> import('@/components/Gallery/NewAlbumModal'));
const PicoCarousel = dynamic(()=>import('@/components/ui/carousel'));

const Header = ({onChange}:{onChange:(input:string)=>void}) => {

    const transition = 'transition-[width] ease-in-out duration-[1000]';
  return (
    <div className="w-screen h-20 p-2 lg:px-64 fixed top-0 bg-pico_default flex items-center place-content-between">
      <div className={`w-max h-max pl-4  ${poppins.className} text-[2.5rem] font-[600] `}>
        PiCo
      </div>
      <div className="transla te-x-12 w-1/2 flex justify-end items-center">
        <input
          className={`${styles.search} w-1/2 hover:w-full lg:hover:w-1/2 focus:w-full lg:focus:w-1/2 h-12 float-right border-solid border-[2px] p-2 px-4 m-1 bg-pico_darker border-pico_darker box-border rounded-md text-xl ${transition}`}
          type="text"
          placeholder="#태그 검색"
          onChange={(e)=>onChange(e.target.value)}
        />
        <IoPersonSharp className="m-4 w-8 h-8"/>
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
  const [tagSearchInput,setTagSearchInput] = useState<string>('');
  const [userAlbumList,setUserAlbumList] = useState<Album[]|undefined>(undefined);
  const [displayingAlbum,setDisplayingAlbum] = useState<Album|undefined>(undefined);
  

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
          thumbnail: albumData.thumbnail || '',
          images: albumData.images || [],
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
  
  return (
    <div className={"w-screen h-screen bg-pico_default flex justify-center overflow-y-scroll scrollbar-hide"}>
      <AlbumContainer userAlbumList={userAlbumList} tagInput={tagSearchInput} selectAlbum={setDisplayingAlbum}/>
      <Header onChange={(input:string)=>setTagSearchInput(input)}/>
      <AddPic open={()=>setNewAlbumModalopen(true)}/>
      {newAlbumModalopen && <NewAlbumModal close={()=>setNewAlbumModalopen(false)} refresh={refresh}/>}
      {displayingAlbum && <>
        <PicoCarousel album={displayingAlbum}/>
        <Actionbar resetAlbum={()=>setDisplayingAlbum(undefined)} album={displayingAlbum} mode="user"/>
        </>}
    </div>
  );
};

export default GalleryPage;