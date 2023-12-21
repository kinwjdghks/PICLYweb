import { useState, useRef, useEffect } from "react";
import { EmptyBlock, ImageBlock, TagBlock } from "./Blocks";
import { IoIosClose } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import styles from "@/styles/animation.module.css";
import Album from "@/templates/Album";
import { StaticImageData } from "next/image";


const ErrorModal = ({errorNo,maxTag,maxImg,reset}:{errorNo: number, maxTag:number, maxImg:number,reset:()=>void}) =>{
    
    const errorMessage = ["",
                        `최대 ${maxTag}개의 태그를 남길 수 있습니다`,
                        "중복된 태그가 있습니다",
                        `최대 ${maxImg}개의 이미지를 저장할 수 있습니다`,
                        "중복된 이미지가 있습니다"];
    useEffect(()=>{
        return ()=>{
            const timer: NodeJS.Timeout = setTimeout(()=>{ //연속으로 오는 에러 핸들링 필요
                reset();
            },1200);
        }
    },[errorNo]);
    return <div className="absolute left-1/2 -translate-x-1/2 bottom-[105%]"><div className={`${errorNo && styles.showmsg} p-2 px-4 bg-pico_lighter rounded-xl`}>
        <p className={`text-xl`}>{errorMessage[errorNo]}</p>
    </div>
    </div>
}

const NewAlbumModal = ({close}:{close:()=>void}) =>{
    
    const scrollImgRef = useRef<HTMLDivElement>(null);
    const inputTagRef = useRef<HTMLInputElement>(null);
    const scrollTagRef = useRef<HTMLDivElement>(null);
    const [imgfiles,setImgfiles] = useState<File[]>([]);
    const [tagList, setTagList] = useState<string[]>([]);
    const [dueDate,setDueDate] = useState<Date|null>(null);
    const [error,setError] = useState<number>(0); //0: no error 1: tags overflow 2:duplicate tags 3: image overflow 4: duplicate imgs
    const maxImgNum = 5;
    const maxTagNum = 5;

    const deleteImageHandler = (filename: string) =>{
        if(!imgfiles) return;
        const updatedFileList = imgfiles.filter((img)=>img.name != filename);
        setImgfiles(updatedFileList);
    }

    const updatefiles = (fileList:FileList|null) =>{
        // console.log(fileList);
        console.log("update files");
        if(imgfiles && fileList){

            //img overflow check
            if(maxImgNum < imgfiles.length + fileList.length){
                setError(3);
                return;
            }

            //dupliction check
            const newFileList = Array.from(fileList) || null;
            for(const file of newFileList){
                for(let i=0;i<imgfiles.length;i++){
                    console.log(file.name+'   '+imgfiles[i].name);
                    if(file.name == imgfiles[i].name){
                        console.log("error 4");
                        setError(4); //duplicate imgs
                        return;
                    }   
                }
            }

            const updatedFileList = [...imgfiles, ...newFileList];
            setImgfiles(updatedFileList);
            console.log("file updated");
        }
    }

    const onAlbumCreate = async () =>{
        //save image to ths storage and get url array.
        const urlList:StaticImageData[] = [];
        
        if(dueDate == null) return;
        // const newAlbum = new Album(dueDate,urlList,tagList);

        
    }


    //autoscroll to very left when list updated.
    const tagAutoscroll = () => {
        const scrollContainer = scrollTagRef.current;
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth + scrollContainer.clientWidth;
        //   console.log(maxScrollLeft)
          scrollContainer.scrollTo(maxScrollLeft, 0);
        }
    }
    useEffect(()=>tagAutoscroll,[tagList.length]);

    const imgAutoscroll = () => {
        const scrollContainer = scrollImgRef.current;
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth + scrollContainer.clientWidth;
        //   console.log(maxScrollLeft)
          scrollContainer.scrollTo(maxScrollLeft, 0);
        }
    }
    useEffect(()=>imgAutoscroll,[imgfiles.length]);

    const addTagHandler = () =>{
        if(inputTagRef.current){
            
            const newtag = inputTagRef.current.value.trim();
            // console.log(newtag);
            if(newtag == '') return;

            if(tagList.length == maxTagNum){
                setError(1);
                return;
            }
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

    

   return  <div className={`w-screen h-screen fixed top-0 left-0 z-[102]`}>
        <div className="(backdrop) w-full h-full fixed bg-black opacity-50 z-100" ></div>
        <IoIosClose className="w-16 h-16 absolute top-0 right-0 m-8 cursor-pointer" onClick={()=>{close()}}/>
        <div className="(modal) lg:w-[900px] lg:h-[700px] w-[300px] h-[600px] p-5 relative z-101 left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white rounded-2xl flex flex-col items-center">
            <BsSendFill className = "w-8 h-8 absolute right-0 top-0 m-6 fill-black cursor-pointer hover:scale-[115%] "
                        onClick={()=>{onAlbumCreate();close()}}/>
            {error!=0 && <ErrorModal errorNo={error} maxTag={maxTagNum} maxImg={maxImgNum} reset={()=>setError(0)}/>}
            <h1 className="text-black text-3xl mb-6">새 앨범</h1>
            <div className="(image list) w-full flex-auto bg-pico_darker rounded-2xl relative overflow-x-scroll scrollbar-hide basis-0" ref={scrollImgRef}>
                <div className="min-w-full w-max h-full flex items-center gap-4 p-4">
                    {imgfiles!.map((img:File)=> <ImageBlock key={img.name} file={img} ondelete={deleteImageHandler}/>)}
                    <EmptyBlock updatefiles={updatefiles} />
                </div>
            </div>

                <div className="(tag list) w-full h-[5.5rem] flex overflow-x-scroll scrollbar-hide" ref={scrollTagRef}>
                    <div className="min-w-max w-min h-full flex items-center" >
                    {tagList.map((tag)=> <TagBlock key={tag} tag={tag} ondelete={deleteTagHandler}/>)}
                    </div>
                </div>
                
            <div className="(tag input) w-full h-min flex items-center box-border place-self-end">
                <span className="w-max mr-3 text-black text-3xl text-center"><FaHashtag/></span>
            
                <input type="text" disabled={error==1 || error==2} className={`disabled:opacity-70 w-full p-2 border-solid border-2 border-black text-black text-xl`}
                     ref={inputTagRef}
                     onKeyDown={(e)=>{
                        if((e.key == 'Enter' || e.keyCode == 13)&& !e.nativeEvent.isComposing){
                            e.preventDefault();
                            addTagHandler();
                            }
                     }}
                     autoFocus
                     placeholder="해쉬태그를 입력하세요"
                     />
            </div>
        </div>
    </div>
}

export default NewAlbumModal;