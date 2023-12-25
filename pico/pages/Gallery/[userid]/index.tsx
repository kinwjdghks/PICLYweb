// import NewAlbumModal from "@/components/Gallery/newalbummodal";
import AlbumContainer from "@/components/AlbumContainer";
import { poppins } from "@/public/assets/fonts/poppins";
import styles from "@/styles/icons.module.css";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import { curAlbumState } from "@/lib/recoil/curAlbumState";
import { useRecoilState } from "recoil";
import Actionbar from "@/components/Gallery/ActionBar";
import { useRouter } from "next/router";
import { Album } from "@/templates/Album";
import { IoPersonSharp } from "react-icons/io5";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";
import { getImagesByID, getThumbNailByID } from "@/lib/functions/functions";
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
  const [curAlbum,setCurAlbum] = useRecoilState(curAlbumState);
  const [userAlbumList,setUserAlbumList] = useState<Album[]|undefined>(undefined);
  
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurAlbum(null);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCurAlbum]);


  const fetchUserAlbums = async (uid:string) => {
    const userAlbums:Album[] = await getAllAlbumsByID(uid);
    // console.log(userAlbums);
    if(userAlbums.length == 0) setUserAlbumList(undefined);
    setUserAlbumList(userAlbums);
  };

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        fetchUserAlbums(user.uid);
        setCurAlbum(null);
        
      }else{
        router.push('/');
      return;
      }
    });
  },[])

  useEffect(() => {
    if(userAlbumList === undefined) return;
    let needsUpdate = false;
  
    const updatedAlbums:Promise<Album>[] = userAlbumList.map(async (album) => {
      // Check if the album has images or not (you can add a condition here)
      if (!album.images) {
        // Fetch all images for the album by its albumID
        const images = await getImagesByID(album.albumID,album.imageCount);
  
        // Update the album with the fetched images
        album.images = images;
  
        // Set the flag to indicate an update is needed
        needsUpdate = true;
      }
      return album;
    });
  
    if (needsUpdate) {
      Promise.all(updatedAlbums)
        .then((resolvedAlbums) => {
          setUserAlbumList(resolvedAlbums);
          console.log('fetched all albums');
        })
        .catch((error) => {
          console.error("Error fetching album images:", error);
        });
    }
  }, [userAlbumList]); // Only run this effect when userAlbumList changes
  
  const getAllAlbumsByID = async (uid:string):Promise<Album[]> =>{
    // console.log('uid:'+uid);
    const albumQuery = query(collection(db, 'Albums'), where('ownerID', '==', uid),orderBy('creationTime','desc'));
    
    try {
      const querySnapshot = await getDocs(albumQuery);
  
      const fetchThumbnails:Promise<Album>[] = querySnapshot.docs.map(async (doc) => {
        const albumData = doc.data();
        const thumbnail = await getThumbNailByID(doc.id);
  
        const album: Album = {
          albumID: doc.id || '',
          ownerID: albumData.ownerID || '',
          creationTime: albumData.creationTime.toDate(),
          expireTime: albumData.expireTime.toDate(),
          tags: albumData.tags || [],
          thumbnail: thumbnail || '',
          imageCount: albumData.imageCount || 0,
          viewCount: albumData.viewCount || 0,
        };
  
        return album;
      });
      const userAlbums:Album[] = await Promise.all(fetchThumbnails);

      // console.log(userAlbums);
      return userAlbums;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const refresh = (newAlbum:Album) =>{
    if(!userAlbumList) setUserAlbumList([newAlbum]);
    else setUserAlbumList((prev)=>[newAlbum, ...prev!]);
  }
  
  return (
    <div className={"w-screen h-screen bg-pico_default flex justify-center overflow-y-scroll scrollbar-hide"}>
      <AlbumContainer userAlbumList={userAlbumList} tagInput={tagSearchInput} />
      <Header onChange={(input:string)=>setTagSearchInput(input)}/>
      <AddPic open={()=>setNewAlbumModalopen(true)}/>
      {newAlbumModalopen && <NewAlbumModal close={()=>setNewAlbumModalopen(false)} refresh={refresh}/>}
      {curAlbum && <>
        <PicoCarousel />
        <Actionbar resetAlbum={()=>setCurAlbum(null)} mode="user"/>
        </>}
    </div>
  );
};

export default GalleryPage;
