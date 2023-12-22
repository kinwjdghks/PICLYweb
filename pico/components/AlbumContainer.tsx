import AlbumComponent from "./AlbumComponent";
import { useEffect, useState,useRef } from "react";

import { Album } from "@/templates/Album";

const NoResult = () =>{

   return <div className="col-span-2">
      <p className="text-white text-center text-[2rem] mt-40">앨범이 없습니다</p>
   </div>
}

const AlbumContainer = ({userAlbumList,tagInput}:{userAlbumList:Album[],tagInput:string}) =>{

    const [filteredAlbumList,setFilteredAlbumList]= useState<Album[]>(userAlbumList);

    const timer = useRef<NodeJS.Timeout|null>(null);
    const media = 'lg:px-64 lg:pt-32 pb-8 lg:gap-[4rem] ';

    const filterByTag = (tagInput:string) =>{
      if(tagInput.trim() == ''){
         setFilteredAlbumList(userAlbumList);
         return;
      }
      const newList = userAlbumList.filter((album)=> album.tags.findIndex((tag)=>tag === tagInput) != -1);
      setFilteredAlbumList(newList);
    }

    useEffect(()=>{
      if(timer.current != null){
         clearTimeout(timer.current);
      }
      timer.current = setTimeout(()=>{
         filterByTag(tagInput);
      },500)
    },[tagInput]);

    return <div className= {media + `w-full h-min pt-[4.5rem] pb-10 relative grid grid-cols-2 auto-rows-auto overflow-y-scroll `}>
        {filteredAlbumList.map((item,idx)=><AlbumComponent key={idx} item={item}/>)}
        {!filteredAlbumList.length && <NoResult/>}
    </div>
}

export default AlbumContainer;