import AboutPage from "@/components/page/AboutPage";
import AlbumDisplayPage from "@/components/page/AlbumDisplayPage";
import Sidebar from "@/components/actions/Sidebar";
import ProfilePage from "@/components/page/ProfilePage";
import { Album } from "@/templates/Album";
import { useState } from "react";
import MobileMenuTab from "@/components/actions/MobileMenuTab";
export type page = 'gallery' | 'profile' | 'about'
const Gallery = () => {

  const [userAlbumList,setUserAlbumList] = useState<Album[]|undefined>(undefined);
  const [mobileMenuOpen,setMobileMenuOpen] = useState<boolean>(false);
  const [page,setPage] = useState<page>('gallery');
   

  return (
  <div className="flex">
    <MobileMenuTab 
      mobileMenuOpen={mobileMenuOpen} 
      setMobileMenuOpen={setMobileMenuOpen}
      switchPage={(page:page)=>setPage(page)}
      />
    <Sidebar switchPage={(page:page)=>setPage(page)}/>
    <AlbumDisplayPage 
      userAlbumList={userAlbumList} 
      setUserAlbumList={setUserAlbumList}
      setMobileMenuOpen={setMobileMenuOpen}/>
    {page === 'gallery' ? '' : page === 'about' ? <AboutPage close={setPage}/> : <ProfilePage albumCount={userAlbumList?.length} close={setPage}/>}
   </div>
  );
};

export default Gallery;