import Image from "next/image";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import Button from "@/components/ui/Button";
import Apple from '@/public/assets/images/Apple_logo.svg';
import arrow from '@/public/assets/images/arrow_back.svg';
import Google from '@/public/assets/images/Google_logo.svg';
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

const Icon = ({src,alt}:{src:StaticImageData, alt:string}) =>{
    const iconsize = 'w-16 h-16 rounded-full ';
    const logosize = 'w-8 h-8 ';

    return <span className={`${iconsize} border-solid border-4 border-white flex justify-center items-center cursor-pointer`}>
        <Image src={src} alt={alt} className={`${logosize}`} draggable="false"/>
    </span>
}
const Login = () => {
  const router = useRouter();

  const inputCN = 'w-full h-12 border-solid border-[1px] p-2 px-4 m-1 border-pico_lighter box-border rounded-md text-black';
  return (
    <div className={`w-screen h-screen relative bg-pico_darker flex justify-center items-end ${nanumgothic.className}`}>
      
      <div className="(container) w-5/6 sm:w-96 h-3/4 relative flex flex-col items-center">
        <Image src="" alt="logo"></Image>
        <form className="w-full h-max m-10">
          <fieldset>
            <input className={inputCN} type='text' placeholder="아이디 또는 전화번호"></input>
          </fieldset>
          <fieldset>
            <input className={inputCN} type='password' placeholder="비밀번호" ></input>
          </fieldset>
        </form>
        <div className="(actions) w-full h-max">
            <button className={`${inputCN} text-white hover:bg-white hover:text-black`} 
               onClick={(e)=>{e.preventDefault(); router.push({pathname:'/Gallery/anyname'})}}>로그인</button>
            <p className="text-center p-6">또는</p>
        </div>
        <div className="(options) w-full flex-grow flex flex-col place-content-between items-center ">

            <div className="(extern login) flex h-max w-max gap-8">
                <Icon src={Google} alt='Google'/>
                <Icon src={Apple} alt='Apple'/>
            </div>
            <div className="flex flex-col mb-4">
            <Button onClick={()=>{}} className="text-1 leading-9">비밀번호 찾기</Button>
            <Button onClick={()=>{}} className="text-1 leading-9">가입하기</Button>
            </div>
        </div>
      </div>
      <Image src={arrow} alt="back" className="w-8 h-8 fixed top-0 left-0 m-8 cursor-pointer"
      onClick={()=>router.push({pathname:'/'})}/>
      

    </div>
  );
};

export default Login;
