import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/animation.module.css';
import logo from "@/public/assets/images/PiCo_Logo_white.svg";
import link from "@/public/assets/images/link.svg";
import { poppins } from "@/public/assets/fonts/poppins";
import { useEffect, useState, useRef } from "react";
import { overrideTailwindClasses as ovr } from "tailwind-override";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { BsLink45Deg } from "react-icons/bs";
import { Album } from "@/templates/Album";



const MenuBar = ({isMenuOpen,first,deleteAlbum,menuClose}:{isMenuOpen:Boolean,first:Boolean,deleteAlbum:()=>void,menuClose:()=>void}) =>{
    const [isLoading,setIsLoading] =  useState<boolean>(false);
    const liCN = "w-full h-12 text-right";
    const initial = "invisible -translate-y-[5%] scale-y-[95%] opacity-0 "; //when closed
    //closing animation should not be seen on first render.
    const animation = `${isMenuOpen ? styles.menuopen : !first ? styles.menuclose: ''} `; //no class when closed and first


    return <ul className={ovr(`w-30 h-max absolute top-20 right-0 p-12 text-2xl text-right  text-[#aaaaaa] ${first && initial} ${animation}`)}>
      {/* <li ><Button className={liCN} onClick={()=>{}} textsize="m" >앨범 편집</Button></li> */}
      <li ><Button className={liCN} onClick={isLoading ? ()=>{} : deleteAlbum } textsize="m" >{isLoading ? '삭제 중...' :'앨범 삭제'}</Button></li>
      <li ><Button className={liCN} onClick={menuClose} textsize="m" >취소</Button></li>
    </ul>
  }

  

const Actionbar = ({resetAlbum,mode,album,deleteAlbum}:{resetAlbum:()=>void,mode:"user"|"guest",album:Album,deleteAlbum:()=>void}) => {
    const [isMenuOpen,setisMenuOpen] = useState<Boolean>(false);
    const [first,setFirst] = useState<Boolean>(true);
    const [showcopymsg,setShowcopymsg] = useState<Boolean>(false);
    const btnRef = useRef<HTMLImageElement>(null);
    const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
    const user:Boolean = mode=="user";
    const address = {'local': 'localhost:3000/Album/', 'app': 'picoweb.vercel.app/Album/'};
    const domain = (string:'local'|'app') => address[string];

    const handleCopyURL = async () => {
      try {
        await navigator.clipboard.writeText(`${domain('app')}${album.albumID}`);
        console.log('클립보드에 링크가 복사되었습니다.');
      } catch (e) {
        console.log('복사에 실패하였습니다');
      }
  };

    const CopiedMSG = ({show}:{show:Boolean}) =>{
      const initial = '-translate-y-[20%] opacity-0 scale[0.95] ';
      return <p className={ovr(`absolute top-[120%] text-2xl -left-[50%] ${initial} ${show && styles.showmsg} `)}>Copied!</p>
    }

    useEffect(() => {
      const handleClick = () => {
        handleCopyURL();    
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
      <div className={`(actionbar) w-screen h-max fixed flex items-center gap-x-8 top-0 lg:p-12 p-4 pt-2 ${poppins.className} z=[102]`}>
          {!user && <Link href={"/"} className="w-max h-max font-bold text-2xl" onClick={resetAlbum}>PiCo
             {/* <Image src={logo} alt="pico" width={30} height={30} className="lg:w-14 lg:h-14 w-10 h-10 cursor-pointer hover:scale-[110%] rotate-12"/> */}
           </Link>}

          {user && <IoIosClose className="w-14 h-14 top-0 left-0 cursor-pointer fill-white"
             onClick={resetAlbum}/>}

          {user && <div ref={btnRef} className="ml-auto relative"><BsLink45Deg className="w-11 h-11 cursor-pointer hover:scale-[115%] " />
          <CopiedMSG show={showcopymsg}/></div>}
          
          {user && <><IoMenu className="w-10 h-10 cursor-pointer hover:scale-[115%] relative" 
            onClick={(e:Event)=>{e.preventDefault(); setisMenuOpen((prev)=>!prev); setFirst(false)}}/>
            <MenuBar isMenuOpen = {isMenuOpen} first={first} deleteAlbum={deleteAlbum} menuClose={()=>{setisMenuOpen(false)}}/></> } 

           
    
      </div>
    );
  };

export default Actionbar;