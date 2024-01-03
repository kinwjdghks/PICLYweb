import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import PopupMessage from "./PopupMessage";

const ErrorModal = ({ errorNo,setErrorNo, maxTag, maxImg }: { errorNo: number,setErrorNo:Dispatch<SetStateAction<number>>, maxTag: number, maxImg: number }): ReactNode => 
{
  const [showError,setShowError] = useState<boolean>(false);

  useEffect(()=>{
    if(errorNo != 0){
      setShowError(true);
    }
  },[errorNo]);
  const errorMessage = [
    "", //0
    `최대 ${maxTag}개의 태그를 남길 수 있습니다`, //1
    "중복된 태그가 있습니다", //2
    `최대 ${maxImg}개의 이미지를 저장할 수 있습니다`, //3
    "중복된 이미지가 있습니다", //4
    "과거로는 설정할 수 없습니다.", //5
  ];

  return (
    <PopupMessage className="fixed" show={showError} setShow={setShowError} ellapseTime={1200} cleanup={()=>setErrorNo(0)}>
      <div className={`bg-pico_lighter rounded-xl`}>
        <p className={`lg:text-xl text-md text-center p-2 px-4`}>
          {errorMessage[errorNo]}
        </p>
      </div>
    </PopupMessage>
  );
};

export default ErrorModal;