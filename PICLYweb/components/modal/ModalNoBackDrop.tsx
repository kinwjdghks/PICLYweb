"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM  from "react-dom"; 

type ModalProps={
    children?: React.ReactNode;
}   

const ModalNoBackDrop = (props: PropsWithChildren<ModalProps>) =>{
    const [clientSide, setClientSide] = useState<boolean>(false);
    useEffect(()=>{
        setClientSide(true);
    },[]);
    if (!clientSide) return <></>;
    if (typeof window === 'undefined') return <></>;
    
    const root = document.getElementById('modalroot');
    const portal = ReactDOM.createPortal(props.children, root!);
        
    return portal;
}
export default ModalNoBackDrop;



