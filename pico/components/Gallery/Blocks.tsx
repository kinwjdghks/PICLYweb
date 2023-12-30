import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";


export const ImageBlock = ({file,ondelete}:{file:File,ondelete:(img:string)=>void}) =>{
    const [imgurl,setImgurl] = useState<string|null>('');
    useEffect(()=>{
        console.log("url created");
        setImgurl(URL.createObjectURL(file));

        return ()=>{
            console.log("url revoked");
            if(imgurl) URL.revokeObjectURL(imgurl);
        };
    },[])

    return <div className="h-full aspect-square relative border-solid border-2 border-pico-default rounded-lg overflow-hidden flex justify-center items-center">
        {imgurl ? <Image src={imgurl} fill className="object-contain" alt="userImage" draggable='false'/> : <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin "/>}
        <IoIosClose className="w-8 h-8 absolute right-0 top-0 m-[1.5] cursor-pointer" onClick={()=>ondelete(file.name)}/>
        
    </div>
}



export const EmptyBlock = ({updateImage}:{updateImage:(fileList:FileList|null)=>void}) =>{
    const inputImgRef = useRef<HTMLInputElement>(null);

    return <div className="h-full aspect-square relative border-solid border-2 border-pico-default rounded-lg flex justify-center items-center">
        <LuImagePlus className = "w-10 h-10 "/>
        <input className="w-full h-full absolute top-0 left-0 cursor-pointer opacity-0" type='file' accept="image/*" multiple
        ref={inputImgRef}
        
        onChange={(e)=>{
            updateImage(e.currentTarget.files);
        }}/>
    </div>
}

export const TagBlock = ({tag,deleteTag}:{tag:string,deleteTag:(tag:string)=>void}) =>{
    return <div className="w-max h-11 p-2 mr-2 text-xl flex rounded-md text-white bg-pico_darker">
        <h2 className="mx-1">{tag}</h2>
        <IoIosClose className="w-8 h-8 cursor-pointer" onClick={()=>deleteTag(tag)}/>
        </div>
}

