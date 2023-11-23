import ex1 from "@/public/assets/images/ex1.jpeg";
import ex2 from "@/public/assets/images/ex2.jpeg";
import ex3 from "@/public/assets/images/ex3.jpeg";
import logo from "@/public/assets/images/logo.png";
import link from "@/public/assets/images/link.svg";
import menu from "@/public/assets/images/menu.svg";
//images
import Image from "next/image";
import Link from "next/link";
import PicoCarousel from "@/components/ui/carousel";
import Button from "@/components/ui/Button";
import { poppins } from "@/public/assets/fonts/poppins";
import styles from '@/styles/animation.module.css';
import { useEffect, useState, useRef } from "react";
import { overrideTailwindClasses as ovr } from "tailwind-override";

const ImageView = () => {
  const dummypics = [
    {
      src: ex1,
      key: 1,
    },
    {
      src: ex2,
      key: 2,
    },
    {
      src: ex3,
      key: 3,
    },
  ];


  const Actionbar = () => {
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
        }, 1000);        
      }
    
      if (btnRef.current) {
        btnRef.current.addEventListener('click', handleClick);
      }
      return () => {
        if (btnRef.current) {
          btnRef.current.removeEventListener('click', handleClick);
        }
      };
    }, []);
    console.log(showcopymsg);
    return (
      <div className={`w-max h-max fixed flex gap-x-8 right-0 top-0 m-10 ${poppins.className}`}>
          <Image src={menu} alt='menu' width={40} height={40} 
          onClick={(e)=>{e.preventDefault(); setMenuOpen((prev)=>!prev); setFirst(false)}}
          className="cursor-pointer hover:scale-[115%]"/>
          <MenuBar open = {menuOpen} first={first} menuClose={()=>{setMenuOpen(false)}}/>
          <Image src={link} alt='link' width={40} height={40}
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
    return <p className={ovr(`absolute top-[120%] text-2xl font-bold left-[24%] ${initial} ${show && styles.showmsg} `)}>Copied!</p>
  }

  return (
    <div className="(background) w-screen h-screen absolute bg-black">
      <PicoCarousel pics={dummypics} />
      <Actionbar />
    </div>
  );
};

export default ImageView;
