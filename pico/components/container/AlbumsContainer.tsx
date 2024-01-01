import AlbumComponent from "./AlbumComponent";
import { useEffect, useState,useRef } from "react";

import { Album } from "@/templates/Album";

const NoResult = () =>{
   return <div className="col-span-2">
      <p className="text-white text-center text-[2rem] mt-40">앨범이 없습니다</p>
   </div>
}

const Loading = () =>{
   return <div className="col-span-2">
      <p className="text-white text-center text-[2rem] mt-40">앨범을 가져오는 중입니다..</p>
   </div>
}

const AlbumsContainer = ({userAlbumList,tagInput,selectAlbum}:{userAlbumList:Album[]|undefined,tagInput:string,selectAlbum:(album:Album)=>void}) =>{
   // Varaibles
   const [filteredAlbumList, setFilteredAlbumList]= useState<Album[]|undefined>(userAlbumList);
   const timer = useRef<NodeJS.Timeout|null>(null);

   // useEffects
   useEffect(()=>{
      // console.log(userAlbumList);
      if(userAlbumList === undefined) return;
      setFilteredAlbumList(userAlbumList);
   },[userAlbumList]);

   useEffect(()=>{
      console.log(filteredAlbumList);
      console.log(userAlbumList);
   },[filteredAlbumList]);

   useEffect(()=>{
      if(timer.current != null){
         clearTimeout(timer.current);
      }
      timer.current = setTimeout(()=>{
         filterByTag(tagInput);
      },500)
   },[tagInput]);

   // Functions
   const filterByTag = (tagInput:string) =>{
      if(tagInput.trim() === '' && userAlbumList){
         setFilteredAlbumList(userAlbumList);
         return;
      }
      if(userAlbumList){
         const newList = userAlbumList.filter((album)=> album.tags.some((tag)=>tag.includes(tagInput)));
         setFilteredAlbumList(newList);
      }
   }

   return (
      <div className={`lg:px-[15%] lg:pt-32 pb-10 lg:gap-4 w-full h-min pt-20 relative grid grid-cols-2 auto-rows-auto overflow-y-scroll `}>
        {!filteredAlbumList ? <Loading /> : (
         <>
            {filteredAlbumList.length === 0 && <NoResult />}
            {filteredAlbumList.length > 0 &&
              filteredAlbumList.map((item, idx) => (
                <AlbumComponent 
                  key={idx} item={item} 
                  priority={idx < 4 && true} 
                  selectAlbum={selectAlbum} />
              ))}
          </>
        )}
      </div>
    );
}

export default AlbumsContainer;