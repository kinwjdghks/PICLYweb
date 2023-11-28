import { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import Image from "next/image";

const ImageBlock = ({img,ondelete}:{img:string,ondelete:(img:string)=>void}) =>{

    return <div className="h-full aspect-square p-4 bg-orange-100">
        <Image src={img} alt="userImage" className="w-full h-full"/>
    </div>
}

const EmptyBlock = ({updatefiles}:{updatefiles:(img : FileList|null)=>void}) =>{
    const inputImgRef = useRef<HTMLInputElement>(null);

    return <div className="h-full aspect-[3/4] border-solid border-2 border-pico-default rounded-lg bg-orange-100">
        <input className="w-full h-full cursor-pointer opacity-0" type='file' accept="img/*" multiple
        ref={inputImgRef}
        onChange={(e)=>{() => updatefiles(e.currentTarget.files || null)}}/>
    </div>
}

const TagBlock = ({tag,ondelete}:{tag:string,ondelete:(tag:string)=>void}) =>{
    return <div className="w-max h-max p-2 mr-2 my-2 flex rounded-md text-black bg-pico_blue">
        <h2 className="mx-1">{tag}</h2>
        <IoIosClose className="w-6 h-6 cursor-pointer" onClick={()=>ondelete(tag)}/>
        </div>
}

const NewAlbumModal = ({close}:{close:()=>void}) =>{
    
    const inputTagRef = useRef<HTMLInputElement>(null);
    const scrollTagRef = useRef<HTMLDivElement>(null);
    const [imgfiles,setImgfiles] = useState<File[]|null>([]);
    const [tagList, setTagList] = useState<string[]>([]);
    const [error,setError] = useState<number>(0); //0: no error 1: tags overflow 2:duplicate tags 3: image overflow
    const maxImgNum = 5;
    const maxTagNum = 5;

    const updatefiles = ({fileList}:{fileList:FileList|null}) =>{
        if(imgfiles && fileList){
            if(maxImgNum < imgfiles.length + fileList.length){
                setError(3);
                const newFileList = Array.from(fileList) || null;
                const updatedFileList = [...imgfiles, ...newFileList];
                setImgfiles(updatedFileList);
                console.log(updatedFileList);
            }
        }
    }

    const autoscroll = () => {
        const scrollContainer = scrollTagRef.current;
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth + scrollContainer.clientWidth;
          console.log(maxScrollLeft)
          scrollContainer.scrollTo(maxScrollLeft, 0);
        }
    }
    useEffect(()=>autoscroll,[tagList.length]);

    const addTagHandler = () =>{
        if(inputTagRef.current){
            if(tagList.length == maxTagNum) return;

            const newtag = inputTagRef.current.value.trim();
            // console.log(newtag);
            if(newtag == '') return;
            const res = tagList.find((tag)=> tag==newtag);
            if(res){
                setError(2);
                return;
            }

            const newTagList = [...tagList,newtag];
            setTagList(newTagList);
            inputTagRef.current.value = '';
            return;
        }
    }

    const deleteTagHandler = (target:string) =>{
        console.log("deleteTag")
        const newTagList:string[] = tagList.filter((tag)=> tag != target);
        setTagList(newTagList);
    }

   return  <div className="w-screen h-screen fixed top-0 left-0">
        <div className="(backdrop) w-full h-full fixed bg-black opacity-50 z-100" onClick={(e)=>{close(); e.stopPropagation()}}></div>
        <div className="(modal) w-1/2 h-1/2  p-5 fixed z-101 bg-white rounded-2xl top-1/4 left-1/4 flex flex-col items-center">
            <h1 className="text-black text-3xl mb-6">새 앨범</h1>
            <div className="(image list) w-full  bg-pico_darker rounded-2xl overflow-x-scroll scrollbar-hide">
                <div className="min-w-max w-max h-full flex items-center p-4">
                    {/* {imgList.map((img)=>{})} */}
                    <EmptyBlock updatefiles={()=>updatefiles} />
                </div>
            </div>
            <div className="(tag list) w-full h-20 relative overflow-x-scroll scrollbar-hide align-center" ref={scrollTagRef}>
                <div className="min-w-max w-min h-max flex items-center" >
                {tagList.map((tag)=> <TagBlock key={tag} tag={tag} ondelete={deleteTagHandler}/>)}
                </div>
            </div>
            <div className="w-full h-min flex items-center ">
                <span className="w-max mr-3 text-black text-3xl "><FaHashtag/></span>
                
                <input type="text" disabled={error==1 || error==2} className={`disabled:opacity-70 w-full p-2 border-solid border-2 border-black text-black text-xl`}
                     ref={inputTagRef}
                     onKeyDown={(e)=>{
                        if((e.key == 'Enter' || e.keyCode == 13)&& !e.nativeEvent.isComposing){
                            e.preventDefault();
                            addTagHandler();
                            }
                     }}
                     placeholder="해쉬태그를 입력하세요"
                     />
            </div>
        </div>
    </div>
}

export default NewAlbumModal;