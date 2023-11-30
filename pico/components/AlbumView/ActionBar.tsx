import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/animation.module.css';
import logo from "@/public/assets/images/logo.png";
import link from "@/public/assets/images/link.svg";
import { poppins } from "@/public/assets/fonts/poppins";
import { useEffect, useState, useRef } from "react";
import { overrideTailwindClasses as ovr } from "tailwind-override";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const MenuBar = ({open,first,menuClose}:{open:Boolean,first:Boolean,menuClose:()=>void}) =>{
    
    const liCN = "w-full h-12 text-right";
    const initial = "invisible -translate-y-[5%] scale-y-[95%] opacity-0 "; //when closed
    //closing animation should not be seen on first render.
    const animation = `${open ? styles.menuopen : !first ? styles.menuclose: ''} `; //no class when closed and first


    return <ul className={ovr(`w-30 h-max absolute top-full text-2xl text-right text-[#aaaaaa] -left-[55%] ${first && initial} ${animation}`)}>
      <li ><Button className={liCN} onClick={()=>{}} textsize="m" >Edit Album</Button></li>
      <li ><Button className={liCN} onClick={()=>{}} textsize="m" >Delete Album</Button></li>
      <li ><Button className={liCN} onClick={menuClose} textsize="m" >Cancel</Button></li>
    </ul>
  }

  const CopiedMSG = ({show}:{show:Boolean}) =>{
    const initial = '-translate-y-[20%] opacity-0 scale[0.95] ';
    return <p className={ovr(`absolute top-[120%] text-2xl left-[24%] ${initial} ${show && styles.showmsg} `)}>Copied!</p>
  }

const Actionbar = ({resetAlbum}:{resetAlbum:()=>void}) => {
    const [menuOpen,setMenuOpen] = useState<Boolean>(false);
    const [first,setFirst] = useState<Boolean>(true);
    const [showcopymsg,setShowcopymsg] = useState<Boolean>(false);
    const btnRef = useRef<HTMLImageElement>(null);
    const timerRef: { current: NodeJS.Timeout | null } = useRef(null);


    useEffect(() => {
      const handleClick = () => {
        if (timerRef.current !== null){
          clearTimeout(timerRef.current);
        }
        setShowcopymsg(true);
        timerRef.current = setTimeout(() => {
          if (btnRef.current) {
            setShowcopymsg(false);
          }
        }, 1200);        
      }
    
      if (btnRef.current) {
        btnRef.current.addEventListener('click', handleClick);
      }
      return () => {
        if (btnRef.current) {
          btnRef.current.removeEventListener('click', handleClick);
        }
      };
    }, []); //throttling for clicking copy btn

    return (
      <div className={`w-max h-max fixed flex items-center gap-x-8 right-0 top-0 m-10 ${poppins.className} z=[102]`}>
          <IoIosClose className="w-14 h-14 fixed top-0 left-0 m-8 cursor-pointer fill-[#aaaaaa]"
             onClick={resetAlbum}/>

          <IoMenu className="w-10 h-10 cursor-pointer hover:scale-[115%]" 
            onClick={(e:Event)=>{e.preventDefault(); setMenuOpen((prev)=>!prev); setFirst(false)}}/>  
          <MenuBar open = {menuOpen} first={first} menuClose={()=>{setMenuOpen(false)}}/>
          <Image src={link} alt='linkcopy' width={40} height={40}
            className="cursor-pointer hover:scale-[115%]"
            onClick={()=>{}}
            ref={btnRef}/>
          <CopiedMSG show={showcopymsg}/>
          <Link href={"/"} className="w-max h-max">
            <Image
              src={logo}
              alt="pico"
              width={70}
              height={70}
              className="cursor-pointer hover:scale-[110%]"
            />
          </Link>
      </div>
    );
  };

export default Actionbar;