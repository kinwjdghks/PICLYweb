import AboutPage from "@/components/AboutPage";
import AlbumDisplayPage from "@/components/AlbumDisplayPage";
import Sidebar from "@/components/Gallery/Sidebar";
import ProfilePage from "@/components/ProfilePage";
import { useState } from "react";

export type page = 'gallery' | 'profile' | 'about'
const Gallery = () => {
   const [page,setPage] = useState<page>('gallery');
   

  return (<div className="flex">
   <Sidebar switchPage={(page:page)=>setPage(page)}/>
   <AlbumDisplayPage/>
   {page === 'gallery' ? '' : page === 'about' ? <AboutPage/> : <ProfilePage/>}
   </div>
  );
};

export default Gallery;