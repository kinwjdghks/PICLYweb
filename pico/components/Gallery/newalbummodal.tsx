import { useState, useRef, useEffect } from "react";
import close from "@/public/assets/images/close_black.svg";
import Image from "next/image";

const ImageBlock = () =>{

    return <div className=""></div>
}

const TagBlock = ({tag,ondelete}:{tag:string,ondelete:(tag:string)=>void}) =>{
    return <div className="w-max h-max p-2 mr-2 flex rounded-md text-black bg-pico_blue">
        <h2 className="mx-1">{tag}</h2>
        <Image src={close} alt='close' className="cursor-pointer" onClick={()=>{ondelete(tag)}} height={20} width={20}/>
        </div>
}

const NewAlbumModal = ({close}:{close:()=>void}) =>{
    const inputTagRef = useRef<HTMLInputElement>(null);
    const scrollTagRef = useRef<HTMLDivElement>(null);
    const [tagList, setTagList] = useState<string[]>([]);
    const [tagNum, setTagNum] = useState<number>(0);
    const [error,setError] = useState<boolean[]>([false,false]); //0: tags overflow 1:duplicate tags

    const autoscroll = () => {
        const scrollContainer = scrollTagRef.current;
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth + scrollContainer.clientWidth;
          console.log(maxScrollLeft)
          scrollContainer.scrollTo(maxScrollLeft, 0);
        }
    }
    useEffect(()=>autoscroll,[tagNum]);

    const addTagHandler = () =>{
        console.log('addTag');
        if(inputTagRef.current){
            const newtag = inputTagRef.current.value.trim();
            console.log(newtag);
            if(newtag == '') return;
            const res = tagList.find((tag)=> tag==newtag);
            if(res){
                setError([false,true]);
                return;
            }

            const newTagList = [...tagList,newtag];
            setTagNum((prev)=>++prev);
            setTagList(newTagList);
            inputTagRef.current.value = '';
            return;
        }
    }

    const deleteTagHandler = (target:string) =>{
        console.log("deleteTag")
        const newTagList:string[] = tagList.filter((tag)=> tag != target);
        setTagNum((prev)=>--prev);
        setTagList(newTagList);
    }

   return  <div className="w-screen h-screen fixed top-0 left-0">
        <div className="(backdrop) w-full h-full fixed bg-black opacity-50 z-100" onClick={(e)=>{close(); e.stopPropagation()}}></div>
        <div className="(modal) w-1/2 h-1/2  p-5 fixed z-101 bg-white rounded-2xl top-1/4 left-1/4 flex flex-col items-center">
        <h1 className="text-black text-3xl mb-6">새 앨범</h1>
            <div className="w-full flex-grow bg-pico_darker rounded-2xl"></div>
            <div className="(tag list) w-full h-max overflow-x-scroll scrollbar-hide " ref={scrollTagRef}>
                <div className="min-w-max w-max h-10 flex items-center py-8" >
                {tagList.map((tag)=> <TagBlock key={tag} tag={tag} ondelete={deleteTagHandler}/>)}
                </div>
            </div>
            <div className="w-full h-min flex items-center ">
            <span className="w-max mr-3 text-black text-3xl font-extrabold ">#</span>
            <input type="text" disabled={error[0]} className={`disabled:opacity-70 w-full p-2 border-solid border-2 border-black text-black text-xl`}
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