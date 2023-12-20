import AlbumComponent from "./AlbumComponent";
import { useEffect, useState,useRef } from "react";
import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";
import Album from "@/templates/Album";

const a1 = new Album(new Date('2023-12-22T19:00:00'),[ex1,ex2,ex3],['tag1','tag2']);
const a2 = new Album(new Date('2023-12-22T01:00:00'),[ex2,ex3,ex1],['tag3','tag4','tag5','superlongtag','supersupersuperlongtag']);
const a3 =  new Album(new Date('2024-01-22T22:00:00'),[ex3],['tag6']);

const dummyItem:Album[] = [
   a1,a2,a3
];

const NoResult = () =>{

   return <div className="col-span-2">
      <p className="text-white text-center text-[2.5rem] mt-40">No Result Found.</p>
   </div>
}

const AlbumContainer = ({tagInput}:{tagInput:string}) =>{
    const [albumList, setAlbumList] = useState<Album[]>(dummyItem);
    const [filteredAlbumList,setFilteredAlbumList]= useState<Album[]>(albumList);

    const timer = useRef<NodeJS.Timeout|null>(null);
    const media = 'lg:px-64 lg:pt-32 pb-8 lg:gap-[4rem] ';

    const filterByTag = (tagInput:string) =>{
      if(tagInput.trim() == ''){
         setFilteredAlbumList(albumList);
         return;
      }
      const newList = albumList.filter((album)=> album.searchForTag(tagInput));
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