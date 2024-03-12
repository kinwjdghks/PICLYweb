import { ReactNode, useRef, useState } from "react";
import ModalWithBackDrop from "./ModalWithBackDrop";
import { createReport } from "@/lib/functions/firebaseCRUD";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ReportModalProps = {
    albumID: string;
    onClickBackDrop: () => void;
}

const ReportModal = ({  albumID, onClickBackDrop }:ReportModalProps):ReactNode =>{
    const listClassName = 'w-full px-12 py-3 text-xl mb-2 rounded-md bg-p icly_darker cursor-pointer ';
    const [reportCode,setReportCode] = useState<1|2|3>(1);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [loading,setLoading] = useState<boolean>(false);

    const submitReport = async () => {
        if(!contentRef.current) return;
        setLoading(true);
        await createReport(albumID, reportCode, contentRef.current.value);
        setLoading(false);
        onClickBackDrop();
    }

    return <ModalWithBackDrop onClickBackDrop={onClickBackDrop}>
        <div className="w-[80%] md:w-[30rem] p-8 flex flex-col items-center bg-picly_darker rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
             onClick={(e)=>e.stopPropagation()}>
            <h1 className="text-white font-bold text-3xl text-center">문제가 발생했나요?</h1>
            <hr className="w-full h-1 mt-8"/>
            <ul className="text-center my-10">
                <li className={`${listClassName} ${reportCode === 1 && 'bg-picly_lighter'}`}
                  onClick={()=>setReportCode(1)}>이미지가 보이지 않음</li>
                <li className={`${listClassName} ${reportCode === 2 && 'bg-picly_lighter'}`}
                  onClick={()=>setReportCode(2)}>
                    부적절한 컨텐츠 발견</li>
                <li className={`${listClassName} ${reportCode === 3 && 'bg-picly_lighter'}`}
                  onClick={()=>setReportCode(3)}>
                    기타</li>
            </ul>
            <textarea className="w-full h-40 text-[#eeeeee] p-2 px-4 text-lg resize-none rounded-md outline-none bg-[#1C1C1E]"
              placeholder="의견을 자유롭게 작성해주세요."
              ref={contentRef}/>
            {loading 
            ? <AiOutlineLoading3Quarters className="w-8 h-8 my-2 mt-5 animate-spin"/>
            : <button className="w-fit px-4 py-2 rounded-md mt-5 text-[#8cb4f3] border-[#8cb4f3] border-[0.5px]"
              onClick={submitReport}>제출</button>}
        </div>

    </ModalWithBackDrop>
}

export default ReportModal;