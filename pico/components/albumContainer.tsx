import Album from "./album";
import { useState } from "react";
import { StaticImageData } from "next/image";
import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";

export type albumProps = {
    // thumbnail: string;
    thumbnail:StaticImageData[]; //미리 담아야하나?
    url: string;
}
type acProps ={

}

const dummyItem:albumProps[] = [{
   thumbnail:[ex1,ex2,ex3],
   url:'/ImageView/anyurl' 
},
{
    thumbnail:[ex2,ex1,ex3],
    url:'' 
 },
 {
    thumbnail:[ex1],
    url:'' 
 },
 {
    thumbnail:[ex2,ex1,ex3],
    url:'' 
 },
 {
    thumbnail:[ex3],
    url:'' 
 }];

const AlbumContainer = () =>{
    const [albumList, setAlbumList] = useState<albumProps[]>(dummyItem);
    const albumcomponents = albumList.map((item)=><Album item={item}/>);
    // const media = 'lg:px-40 lg:gap-[5%] lg:py-48 '
    const media = 'lg:px-64 lg:pt-32 pb-8 lg:gap-[4rem] ';

    return <div className= {media + `w-full h-min pt-[4.5rem] pb-10 relative grid grid-cols-2 auto-rows-auto overflow-y-scroll scrollbar-hide`}>
        {albumcomponents}
    </div>
}

export default AlbumContainer;