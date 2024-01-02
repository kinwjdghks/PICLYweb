import styles from "@/styles/animation.module.css";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";

const PopupMessage = ({children,show,setShow,ellapseTime,callback=()=>{}}:{children:ReactNode,show:boolean,setShow:Dispatch<SetStateAction<boolean>>,ellapseTime:number,callback?:()=>void}):ReactNode =>{
    const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
    //functions
    useEffect(()=>{
      if(show===true){
        messageShowHandler();
      }
    },[show]);

    const messageShowHandler = () => {
      if (timerRef.current !== null) {
        return;
      }
      callback();
      timerRef.current = setTimeout(() => {   
        setShow(false);
        clearTimeout(timerRef.current!);
        timerRef.current = null;
      }, ellapseTime);
    };
    return <div className={`lg:-left-[250%] scale[0.95] ${styles.showmsg}`}>{children}</div>
}

export default PopupMessage;