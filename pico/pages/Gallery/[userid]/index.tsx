import AboutPage from "@/components/AboutPage";
import AlbumDisplayPage from "@/components/AlbumDisplayPage";
import Sidebar from "@/components/Gallery/Sidebar";
import ProfilePage from "@/components/ProfilePage";
import { Album } from "@/templates/Album";
import { useState } from "react";

export type page = 'gallery' | 'profile' | 'about'
const Gallery = () => {

  const [userAlbumList,setUserAlbumList] = useState<Album[]|undefined>(undefined);
  const [page,setPage] = useState<page>('gallery');
   

  return (<div className="flex">
   <Sidebar switchPage={(page:page)=>setPage(page)}/>
   <AlbumDisplayPage userAlbumList={userAlbumList} setUserAlbumList={setUserAlbumList}/>
   {page === 'gallery' ? '' : page === 'about' ? <AboutPage /> : <ProfilePage albumCount={userAlbumList?.length} close={setPage}/>}
   </div>
  );
};

export default Gallery;