import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import PopupMessage from "./PopupMessage";
import AlertMessage from "./AlertMessage";

//error types
export type Error = 'MAX_IMG'| 'DUP_IMG' | 'MAX_TAG' | 'DUP_TAG' | 'DUE_PAST' | 'EMPTY_IMG' | 'EMPTY_DUE' | '';

const ErrorModal = ({ errorNo,setErrorNo, maxTag, maxImg }: { errorNo: Error,setErrorNo:Dispatch<SetStateAction<Error>>, maxTag: number, maxImg: number }): ReactNode => 
{
  const [showError,setShowError] = useState<boolean>(false);

  useEffect(()=>{
    if(errorNo != ''){
      setShowError(true);
    }
  },[errorNo]);
  const errorMessage = {
    '':'',
    'MAX_TAG':`최대 ${maxTag}개의 태그를 남길 수 있습니다`, //1
    'DUP_TAG':"중복된 태그가 있습니다", //2
    'MAX_IMG':`최대 ${maxImg}개의 이미지를 저장할 수 있습니다`, //3
    'DUP_IMG':"중복된 이미지가 있습니다", //4
    'DUE_PAST':"과거로는 설정할 수 없습니다.", //5
    'EMPTY_DUE':'마감기한을 설정해야 합니다.',
    'EMPTY_IMG':'최소 1장의 이미지를 등록해야 합니다.',
  };

  return (
    <PopupMessage className="fixed top-16 left-1/2 -translate-x-1/2" show={showError} setShow={setShowError} ellapseTime={1200} cleanup={()=>setErrorNo('')}>
      <AlertMessage>{errorMessage[errorNo]}</AlertMessage>
    </PopupMessage>
  );
};

export default ErrorModal;