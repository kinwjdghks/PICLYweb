import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM  from "react-dom"; 

type ModalProps={
    children?: React.ReactNode;
    onClick?:()=>void;
}   

const BackDrop = ({children,onClick}:ModalProps)=>{
    return <div className="(backdrop) w-screen h-screen left-0 top-0 fixed bg-black/80"
      onClick={onClick}>{children}</div>
}

const ModalWithBackDrop = (props: PropsWithChildren<ModalProps>) =>{
    const [clientSide, setClientSide] = useState<boolean>(false);
    useEffect(()=>{
        setClientSide(true);
    },[]);
    if (!clientSide) return <></>;
    if (typeof window === 'undefined') return <></>;
    
    const root = document.getElementById('modalroot');
    const portal = ReactDOM.createPortal(<BackDrop onClick={props.onClick}>{props.children}</BackDrop>, root!);
        
    return portal;
} 
export default ModalWithBackDrop;



