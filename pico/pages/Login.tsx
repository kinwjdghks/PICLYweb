import Image from "next/image";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import Button from "@/components/ui/Button";
import { _user_ } from "@/templates/user";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import arrow from '@/public/assets/images/arrow_back.svg';
import PiCologo from '@/public/assets/images/PiCo_Logo_white.svg';
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase/firebase";
import {  useRef, useState } from "react";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/lib/recoil/loginstate";
import { db } from "@/lib/firebase/firebase";
import { DocumentSnapshot, doc,getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

type loginMethod = 'google'|'apple'|'email'

const Login = () => {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement|null>(null);
  const pwRef = useRef<HTMLInputElement|null>(null);
  const pwcRef = useRef<HTMLInputElement|null>(null);
  const [isRegistering,setIsRegistering] = useState<boolean>(false);
  const [loginMethod,setLoginMethod] = useState<loginMethod>('google');
  const setLoginstate = useSetRecoilState(loginState);
  const [msg,setMsg] = useState<string>('');

  const clearInput = () =>{
    if(idRef.current) idRef.current.value = '';
    if(pwRef.current) pwRef.current.value = '';
    if(pwcRef.current) pwcRef.current.value = '';
  }

  const login_Google = async (id: string, pw: string): Promise<boolean> => {
    return false;
  };

  const login_Apple = async (id: string, pw: string): Promise<boolean> => {
      return false;
  };
    

  const login_Email = async (id: string, pw: string): Promise<boolean> => {

      let userInfo:DocumentSnapshot;
      let user;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, id, pw);
        user = userCredential.user;
        const docRef = doc(db,'Users',user.uid);
        console.log(user.uid)
        userInfo = await getDoc(docRef);

      }catch (error) {
        if(error instanceof FirebaseError){
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-credential":
              setMsg("이메일 혹은 비밀번호가 일치하지 않습니다.");
              break;
            case "auth/email-already-in-use":
              setMsg("이미 사용 중인 이메일입니다.");
              break;
            case "auth/weak-password":
              setMsg("비밀번호는 6글자 이상이어야 합니다.");
              break;
            case "auth/network-request-failed":
              setMsg("네트워크 연결에 실패 하였습니다.");
              break;
            case "auth/invalid-email":
              setMsg("잘못된 이메일 형식입니다.");
              break;
            case "auth/internal-error":
              setMsg("잘못된 요청입니다.");
              break;
        }
      }
        return false;
        
      }
    

      if(userInfo.exists()){
        const loggedInUser:_user_ = {uid:user.uid, email:id, authProvider:"Email", creationTime:userInfo.get('creationTime')};
        console.log(loggedInUser);
        setLoginstate(loggedInUser);
        sessionStorage.setItem('picoweb_loginState',JSON.stringify(loggedInUser));
        router.push(`/Gallery/${user.uid}`)
        return true;
      }
      else{
        setMsg('유저정보가 존재하지 않습니다');
        return false;
      }
    };

  const register_Google = (id: string, pw: string) =>{

  }

  const register_Apple = (id: string, pw: string) =>{


  }

  const register_Email = async (email:string, pw:string):Promise<boolean> =>{
    
    let user;
    try{
    //create user credential
    const userCredential = await createUserWithEmailAndPassword(auth,email,pw)
    user = userCredential.user;
    }catch (error) {
      if(error instanceof FirebaseError){
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            setMsg("이미 사용 중인 이메일입니다.");
            break;
          case "auth/weak-password":
            setMsg("비밀번호는 6글자 이상이어야 합니다.");
            break;
          case "auth/network-request-failed":
            setMsg("네트워크 연결에 실패 하였습니다.");
            break;
          case "auth/invalid-email":
            setMsg("잘못된 이메일 형식입니다.");
            break;
          case "auth/internal-error":
            setMsg("잘못된 요청입니다.");
            break;
      }
    }
      return false;
    }

    try{
      //create firebase user doc
    const user_doc = {
      uid: user.uid,
      email: email,
      authProvider: 'Email',
      creationTime: new Date(),
    }
    const docRef = doc(db,'Users',user.uid);
    await setDoc(docRef, user_doc);
    return true
    }
    catch (error){
      console.log(error);
      return true
    }

  }

  const login = () =>{
    // e.preventDefault();
    const id = idRef?.current?.value;
    const pw = pwRef?.current?.value;

    const result = loginMethod == 'google' ? login_Google(id! , pw!)
    : loginMethod == 'apple' ? login_Apple(id!, pw!)
    : login_Email(id!,pw!);
  }

  const register = async () =>{
    const id = idRef?.current?.value.trim();
    const pw = pwRef?.current?.value.trim();
    const pwc = pwcRef?.current?.value.trim();
    
    if(pw !== pwc){
      setMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    // const result = loginMethod == 'google' ? await register_Google(id! , pw!)
    // : loginMethod == 'apple' ? await register_Apple(id!, pw!)
    // : await register_Email(id!,pw!)
    const result = await register_Email(id!,pw!);
    
    
    if(result == true){
      clearInput();
      setIsRegistering(false);
      setMsg('정상적으로 가입되었습니다');
    }
  }


  const inputCN = 'w-full h-12 border-solid border-[1px] p-2 px-4 m-1 border-pico_lighter box-border rounded-md text-black';
  return (
    <div className={`w-screen h-screen relative bg-pico_darker flex justify-center items-end ${nanumgothic.className}`}>
      
      <div className="(container) w-5/6 sm:w-96 h-3/4 mb-16 relative flex flex-col items-center">
        <Image src={PiCologo} alt="logo" className="w-16 h-16 rotate-12"></Image>
        <form className="w-full h-max mt-10">
          <fieldset>
            <input className={inputCN} type='text' placeholder={loginMethod=="google" ? '구글 아이디' : loginMethod == 'apple' ? '애플 아이디' : '이메일'} ref={idRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
          <fieldset>
            <input className={inputCN} type='password' placeholder="비밀번호" ref={pwRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
          <fieldset className={`${!isRegistering && 'invisible'}`}>
            <input className={inputCN} type='password' placeholder="비밀번호 확인" ref={pwcRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
        </form>
        <p className="pt-2">{msg}</p>
        
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
               onClick={isRegistering ? register : login}>{isRegistering ? '가입하기':'로그인'}</button>
        </div>
          <div className="flex flex-col mt-auto">
          <Button onClick={()=>{}} className="text-1 leading-9 opacity-30 cursor-default">비밀번호 찾기</Button>
          <Button onClick={()=>{setIsRegistering((prev)=>!prev)}} className="text-1 leading-9">{isRegistering  ? '취소' : '가입하기'}</Button>
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