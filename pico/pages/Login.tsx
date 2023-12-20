import Image from "next/image";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import Button from "@/components/ui/Button";
import { user } from "@/templates/user";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import arrow from '@/public/assets/images/arrow_back.svg';
import PiCologo from '@/public/assets/images/PiCo_Logo_white.svg';
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase/firebase";
import { MouseEventHandler, useRef, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/lib/recoil/loginstate";
import { db } from "@/lib/firebase/firebase";
import { collection,doc,getDoc, setDoc } from "firebase/firestore";

type loginMethod = 'google'|'apple'|'email'

const Login = () => {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement|null>(null);
  const pwRef = useRef<HTMLInputElement|null>(null);
  const setLoginstate = useSetRecoilState(loginState);
  const [loginMethod,setLoginMethod] = useState<loginMethod>('google');

  const login_Google = async (id: string, pw: string): Promise<boolean> => {
    return false;
  };

  const login_Apple = async (id: string, pw: string): Promise<boolean> => {
      return false;
  };
    

  const login_Email = async (id: string, pw: string): Promise<boolean> => {
      
      console.log('flag1')
      try {
        const userCredential = await signInWithEmailAndPassword(auth, id, pw);
        const user = userCredential.user;
        const docRef = doc(db,'users',user.uid);
        console.log(user.uid)
        const userInfo = await getDoc(docRef);
        console.log('flag2')

        if(userInfo.exists()){
          console.log(userInfo);
          return true;
        }

        else{
          console.log('login failed');
          return false
        }
      //   const loggedIn:user = {}
      //   setLoginstate()
        // save login state
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    };


  const signin_Email = async (email:string, pw:string) =>{
    await createUserWithEmailAndPassword(auth,email,pw)
    .then(async (userCredential)=>{
      const user = userCredential.user;
      const usersData:user = new user(email,'email');
      
        
      
      const docRef = doc(db,'users',user.uid);
      const userInfo = await setDoc(docRef);

    })

  }

  const login = () =>{
    // e.preventDefault();
    const id = idRef?.current?.value;
    const pw = pwRef?.current?.value;
    if(!id || !pw) return;
    let result;
    if(loginMethod == 'google') result = login_Google(id , pw);
    else if(loginMethod == 'apple') result = login_Apple(id , pw);
    else {
      result = login_Email(id , pw);
      console.log('test0')
    }
  }



  const inputCN = 'w-full h-12 border-solid border-[1px] p-2 px-4 m-1 border-pico_lighter box-border rounded-md text-black';
  return (
    <div className={`w-screen h-screen relative bg-pico_darker flex justify-center items-end ${nanumgothic.className}`}>
      
      <div className="(container) w-5/6 sm:w-96 h-3/4 relative flex flex-col items-center">
        <Image src={PiCologo} alt="logo" className="w-16 h-16 rotate-12"></Image>
        <form className="w-full h-max mt-10">
          <fieldset>
            <input className={inputCN} type='text' placeholder={loginMethod=="google" ? '구글 아이디' : loginMethod == 'apple' ? '애플 아이디' : '이메일'} ref={idRef}></input>
          </fieldset>
          <fieldset>
            <input className={inputCN} type='password' placeholder="비밀번호" ref={pwRef}></input>
          </fieldset>
        </form>
        
        <div className="(options) w-full flex-grow flex flex-col items-center ">

            <div className="(login method) flex h-max w-max gap-8 m-8">
                <span className={`w-16 h-16 rounded-full ${loginMethod === 'google' && 'border-4'} flex justify-center items-center cursor-pointer hover:scale-[105%]`}
                  onClick={()=>{setLoginMethod('google')}}>
                  <FcGoogle className="w-10 h-10"/>
                </span>
                <span className={`w-16 h-16 rounded-full ${loginMethod == 'apple' &&'border-4'} flex justify-center items-center cursor-pointer hover:scale-[105%]`}
                  onClick={()=>{setLoginMethod('apple')}}>
                  <FaApple className="w-10 h-10 -translate-y-[2px]"/>
                </span>
                <span className={`w-16 h-16 rounded-full ${loginMethod == 'email' &&' border-4'} flex justify-center items-center cursor-pointer hover:scale-[105%]`}
                  onClick={()=>{setLoginMethod('email')}}>
                  <MdEmail className="w-10 h-10"/>
                </span>
            </div>
            <div className="(action) w-full h-max">
            <button className={`${inputCN} text-white hover:bg-white hover:text-black`} 
               onClick={login}>로그인</button>
        </div>
          <div className="flex flex-col mb-4 mt-auto">
          <Button onClick={()=>{}} className="text-1 leading-9 opacity-30 cursor-default">비밀번호 찾기</Button>
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

// e.preventDefault(); router.push({pathname:'/Gallery/anyname'})