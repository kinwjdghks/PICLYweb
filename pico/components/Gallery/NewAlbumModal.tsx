import { useState, useRef, useEffect, RefObject } from "react";
import { EmptyBlock, ImageBlock, TagBlock } from "./Blocks";
import { IoIosClose } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsSendFill } from "react-icons/bs";
import styles from "@/styles/animation.module.css";
import { auth  } from "@/lib/firebase/firebase";
import { Album } from "@/templates/Album";
import { createAlbum } from "@/lib/functions/firebaseCRUD";


const ErrorModal = ({errorNo,maxTag,maxImg,reset}:{errorNo: number, maxTag:number, maxImg:number,reset:()=>void}) =>{
    
    useEffect(()=>{
        return ()=>{
            const timer: NodeJS.Timeout = setTimeout(()=>{ //연속으로 오는 에러 핸들링 필요
                reset();
            },1200);
        }
    },[errorNo]);

    const errorMessage = ["",                   //0
        `최대 ${maxTag}개의 태그를 남길 수 있습니다`,   //1
        "중복된 태그가 있습니다",                     //2
        `최대 ${maxImg}개의 이미지를 저장할 수 있습니다`,//3
        "중복된 이미지가 있습니다",                   //4
        "과거로는 설정할 수 없습니다."                 //5
        ];
        
    return (
    <div className="absolute left-1/2 -translate-x-1/2">
        <div className={`${errorNo && styles.showmsg} p-2 px-4 bg-pico_lighter rounded-xl`}>
            <p className={`lg:text-xl text-md text-center`}>{errorMessage[errorNo]}</p>
        </div>
    </div>);
}
type ImgDisplayProps={
    imgfiles:File[]
    scrollImgRef:RefObject<HTMLDivElement>
    deleteImage:(filename: string)=>void
    updateImage:(fileList:FileList|null)=>void
}

const ImgDisplay = ({imgfiles,scrollImgRef,deleteImage,updateImage}:ImgDisplayProps):React.ReactNode =>{
    return <div className="(image list) w-full h-full flex-auto lg:mt-0 mt-[20px] bg-pico_darker rounded-2xl relative overflow-x-scroll scrollbar-hide basis-0" ref={scrollImgRef}>
                <div className="min-w-full w-max h-full flex items-center gap-4 p-4">
                    {imgfiles!.map((img:File)=> <ImageBlock key={img.name} file={img} ondelete={deleteImage}/>)}
                    <EmptyBlock updateImage={updateImage} />
                </div>
            </div>
}

type TagListProps = {
    scrollTagRef:RefObject<HTMLDivElement>
    tagList:string[]
    deleteTag:(filename:string)=>void
    error:number,
    inputTagRef:RefObject<HTMLInputElement>,
    addTag:()=>void
}

const TagList = ({scrollTagRef,tagList,deleteTag,error,inputTagRef,addTag}:TagListProps):React.ReactNode =>{
    return (
    <>
        <div className="(tag list) w-full h-[4.5rem] flex overflow-x-scroll scrollbar-hide" 
          ref={scrollTagRef}>
            <div className="min-w-max w-min h-full flex items-center" >
            {tagList.map((tag)=> <TagBlock key={tag} tag={tag} deleteTag={deleteTag}/>)}
            </div>
        </div>
        <div className="(tag input) w-full h-min flex items-center box-border place-self-end">
        <span className="w-max mr-3 text-black text-3xl text-center">
            <FaHashtag className="lg:fill-black fill-white"/>
        </span>
        <input className={`disabled:opacity-70 w-full p-2 border-solid border-2 border-black text-black text-xl`}
          type="text" 
          disabled={error==1 || error==2} 
          ref={inputTagRef}
          onKeyDown={(e)=>{
            if((e.key == 'Enter' || e.keyCode == 13)&& !e.nativeEvent.isComposing){
                e.preventDefault();
                addTag();
                }
            }
          }
          autoFocus
          placeholder="태그를 입력하세요"/>
        </div>
    </>);
}
type DateInputProps ={
    handleDateChange:(e:React.ChangeEvent<HTMLInputElement>) => void
    handleTimeChange:(e:React.ChangeEvent<HTMLInputElement>) => void
    dateDiff:number
}

const DateInput = ({handleDateChange, handleTimeChange,dateDiff}:DateInputProps):React.ReactNode =>{
    const [infoOpen,setInfoOpen] = useState<boolean>(false);
    const dueMsg = 
      `${Math.round(dateDiff/(24 * 60)) ? Math.round(dateDiff/(24 * 60))+'일' : ''} 
      ${Math.round(dateDiff / 60) ? Math.round(dateDiff / 60 ) % 24 +'시 간' : ''}
      ${Math.round(dateDiff % 60)}분 후 만료`;

    return (
    <div className="flex flex-col lg:w-full">
        <div className="w-full h-fit flex items-center">
            <input className="text-black h-10 w-42 m-2 p-4 border-2" 
              type='date' 
              onChange={handleDateChange}/>
            <input className="text-black h-10 w-42 m-2 p-4 border-2" 
              type='time' 
              step={60} 
              onChange={handleTimeChange}/>
            <IoMdInformationCircleOutline  className="w-6 h-6" 
              onMouseOver={()=>setInfoOpen(true)} 
              onMouseOut={()=>setInfoOpen(false)}/>
            {infoOpen && <p className="absolute translate-y-[130%] right-4 bg-pico_darker p-2 rounded-lg">앨범 기본 마감기한은 7일입니다.</p>}
        </div>
        <p className="h-12 text-center p-2  justify-center">{dateDiff >0 && dueMsg}</p>
    </div>);
}

const NewAlbumModal = ({close, refreshWithNewAlbum}:{close:()=>void, refreshWithNewAlbum:(newAlbum:Album)=>void}) =>{
   
    //initialization
    const oneWeekLaterFromNow = new Date();
    oneWeekLaterFromNow.setDate(oneWeekLaterFromNow.getDate() + 7);
    //user inputs
    const [imgfiles,setImgfiles] = useState<File[]>([]);
    const [tagList, setTagList] = useState<string[]>([]);
    const [dueDate,setDueDate] = useState<Date>(oneWeekLaterFromNow);
    const [dateDiff,setDateDiff] = useState<number>(0); //분단위
    //states
    const [errorMsg,setErrorMsg] = useState<number>(0);
    const [error,setError] = useState<boolean>(true);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    //refs
    const scrollImgRef = useRef<HTMLDivElement>(null);
    const inputTagRef = useRef<HTMLInputElement>(null);
    const scrollTagRef = useRef<HTMLDivElement>(null);
    const maxImgNum = 5;
    const maxTagNum = 5;

    //useEffects
    useEffect(()=>{
        if(imgfiles.length > 0 && dateDiff > 0) setError(false);
        else setError(true);
    },[imgfiles,dateDiff]);

    useEffect(()=>{
        imgAutoscroll()
    },[imgfiles.length]);

    useEffect(()=>{
        tagAutoscroll()
    },[tagList.length]);
    

    const deleteImage = (filename: string) =>{
        if(!imgfiles) return;
        const updatedFileList = imgfiles.filter((img)=>img.name != filename);
        setImgfiles(updatedFileList);
    }

    const updateImage = (fileList:FileList|null) =>{
        if(imgfiles && fileList){
            //img overflow check
            if(maxImgNum < imgfiles.length + fileList.length){
                setErrorMsg(3);
                return;
            }
            //dupliction check
            const newFileList = Array.from(fileList) || null;
            for(const file of newFileList){
                for(let i=0;i<imgfiles.length;i++){
                    console.log(file.name+'   '+imgfiles[i].name);
                    if(file.name == imgfiles[i].name){
                        setErrorMsg(4); //duplicate imgs
                        return;
                    }   
                }
            }
            const updatedFileList = [...imgfiles, ...newFileList];
            setImgfiles(updatedFileList);
            console.log("file updated");
        }
    }

    //autoscroll to very left when list updated.
    const tagAutoscroll = () => {
        const scrollContainer = scrollTagRef.current;
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth + scrollContainer.clientWidth;
        //console.log(maxScrollLeft)
          scrollContainer.scrollTo(maxScrollLeft, 0);
        }
    }
   
    const imgAutoscroll = () => {
        const scrollContainer = scrollImgRef.current;
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth + scrollContainer.clientWidth;
        //   console.log(maxScrollLeft)
          scrollContainer.scrollTo(maxScrollLeft, 0);
        }
    }
    
    const addTag = () =>{
        if(!inputTagRef.current) return;
        const newtag = inputTagRef.current.value.trim();
        if(newtag == '') return;

        if(tagList.length == maxTagNum){
            setErrorMsg(1);
            return;
        }
        const res = tagList.find((tag)=> tag==newtag);
        if(res){
            setErrorMsg(2);
            return;
        }
        const newTagList = [...tagList,newtag];
        setTagList(newTagList);
        inputTagRef.current.value = '';
        return;
        
    }

    const deleteTag = (target:string) =>{
        console.log("deleteTag")
        const newTagList:string[] = tagList.filter((tag)=> tag != target);
        setTagList(newTagList);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = event.target.value;
        
        // Extract hour and minute components from the current dueDate
        const currentHour = dueDate.getHours();
        const currentMinute = dueDate.getMinutes();
        // Create a new Date object with the selected date and the preserved time
        const newDate = new Date(dateString);
        newDate.setHours(currentHour);
        newDate.setMinutes(currentMinute);
        
        //calculate Time difference
        const now = new Date();
        const diff = (newDate.getTime() - now.getTime())/(60 * 1000); //minute 단위
        console.log(diff);
        setDueDate(newDate);
        setDateDiff(Math.floor(diff));
        if(diff<=0){
            setErrorMsg(5);
            return;
        }
      };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = event.target.value;
    const [newHour,newMinute] = timeString.split(':');
    
    let currentDate = dueDate || new Date();
    currentDate.setHours(+newHour);
    currentDate.setMinutes(+newMinute);
    // Calculate Time difference in hours (with timezone offset)
    const now = new Date();
    const diff = (currentDate.getTime() - now.getTime()) / (60 * 1000);
    console.log(diff);
    
    if (diff < 0) {
        setErrorMsg(5);
        return;
    }
    
    setDueDate(currentDate);
    setDateDiff(Math.floor(diff));
    };

    const onAlbumCreate = async () =>{
        setIsLoading(true);
        const createdAlbum = await createAlbum(auth.currentUser!.uid,dueDate,tagList,imgfiles);
        setIsLoading(false);

        if(!createdAlbum){
            console.log("album creation fail");
            return;
        }
        refreshWithNewAlbum(createdAlbum);
        close(); 
    }

    return  <div className={`w-screen h-screen fixed top-0 left-0 z-[102]`}>
        <div className="(backdrop) w-full h-full fixed bg-black opacity-50 z-100" ></div>
        <div className="(modal) lg:w-[900px] lg:h-[700px] w-full h-screen p-5 relative z-101 lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:bg-white rounded-xl flex flex-col items-center
                                content-start bg-pico_default">
            {!error && !isLoading && <BsSendFill className = "hidden lg:block w-8 h-8 absolute right-0 top-0 m-6 fill-black cursor-pointer hover:scale-[115%] "
                        onClick={onAlbumCreate}/>}
            {!error && !isLoading && <button onClick={onAlbumCreate} className="lg:hidden absolute right-0 top-0 m-5 text-2xl text-pico_blue">완료</button>}
            {isLoading && <AiOutlineLoading3Quarters className='w-10 h-10 absolute right-0 top-0 m-6 lg:fill-black animate-spin'/>}
            {errorMsg!=0 && <ErrorModal errorNo={errorMsg} maxTag={maxTagNum} maxImg={maxImgNum} reset={()=>setErrorMsg(0)}/>}
            <h1 className="lg:text-black text-3xl mb-6">새 앨범</h1>
            
            <p className="lg:text-black w-full font-bold p-1">사진</p>
            <ImgDisplay imgfiles={imgfiles} scrollImgRef={scrollImgRef} deleteImage ={deleteImage} updateImage={updateImage} />
            
            <p className="lg:text-black w-full font-bold p-1 mt-2">만료 기한</p>
            <DateInput handleDateChange={handleDateChange} handleTimeChange={handleTimeChange} dateDiff={dateDiff}/>  
            
            <p className="lg:text-black w-full font-bold p-1">태그</p>  
            <TagList scrollTagRef={scrollTagRef} tagList={tagList} deleteTag={deleteTag} error={errorMsg} inputTagRef={inputTagRef} addTag={addTag}/>  
            <p className="lg:text-black pt-12 text-sm text-center">선정적이거나 모욕적인 이미지, 비속어, 개인정보가 <br/>포함된 내용은 제재의 대상이 될 수 있습니다.</p>
        </div>
       {!isLoading && <IoIosClose className="w-16 h-16 absolute top-0 right-auto lg:right-0 lg:m-8 m-2 cursor-pointer" onClick={close}/>}

    </div>
}

export default NewAlbumModal;