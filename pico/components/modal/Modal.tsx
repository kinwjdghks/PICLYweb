import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM  from "react-dom"; 

type ModalProps={
    children?: React.ReactNode;
}   

const BackDrop = ({children}:ModalProps)=>{
    return <div className="(backdrop) w-screen h-screen left-0 top-0 fixed bg-black/80">{children}</div>
}

const Modal = (props: PropsWithChildren<ModalProps>) =>{
    const [clientSide, setClientSide] = useState<boolean>(false);
    useEffect(()=>{
        setClientSide(true);
    },[]);
    if (!clientSide) return <></>;
    if (typeof window === 'undefined') return <></>;
    
    const root = document.getElementById('modalroot');
    const portal = ReactDOM.createPortal(<BackDrop >{props.children}</BackDrop>, root!);
        
    return portal;
}
export default Modal;



