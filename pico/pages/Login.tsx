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
import { doc,getDoc, setDoc } from "firebase/firestore";


type loginMethod = 'google'|'apple'|'email'

const Login = () => {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement|null>(null);
  const pwRef = useRef<HTMLInputElement|null>(null);
  const pwcRef = useRef<HTMLInputElement|null>(null);
  const [isSigningIn,setIsSigningIn] = useState<boolean>(false);
  const setLoginstate = useSetRecoilState(loginState);
  const [loginMethod,setLoginMethod] = useState<loginMethod>('google');
  const [msg,setMsg] = useState<string>('');

  const clearInput = () =>{
    if(idRef.current) idRef.current.value = '';
    if(pwRef.current) pwRef.current.value = '';
    if(pwcRef.current) pwcRef.current.value = '';
  }

  const inputValidation = (id:string|undefined, pw:string|undefined, pwc:string|undefined):boolean =>{
    if(!id){
      setMsg('이메일/아이디를 입력해주세요');
      return false;
    }
    if(!pw){
      setMsg('비밀번호를 입력해주세요');
      return false;
    }
    if(pw != pwc){
      setMsg('비밀번호가 일치하지 않습니다');
      return false;
    }
    if(loginMethod == 'email'){
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const test = emailPattern.test(id);
      
      if(!test){
        setMsg('이메일 형식이 올바르지 않습니다.');
        return false;
      }
    }
    else{
      const idPattern = /^[a-zA-Z0-9]{7,}$/;
      const test = idPattern.test(id);

      if(!test){
        setMsg('아이디는 6자 이상의 알파벳/숫자 조합이 필요합니다.')
        return false;
      }      
    }
    const pwPattern = /^[a-zA-Z0-9]{7,}$/;
    const test = pwPattern.test(pw);
    if(!test){
      setMsg('비밀번호는 6자 이상의 알파벳/숫자 조합이 필요합니다.')
      return false;
    } 
    return true;
    
  }

  const login_Google = async (id: string, pw: string): Promise<boolean> => {
    return false;
  };

  const login_Apple = async (id: string, pw: string): Promise<boolean> => {
      return false;
  };
    

  const login_Email = async (id: string, pw: string): Promise<boolean> => {
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, id, pw);
        const user = userCredential.user;
        const docRef = doc(db,'Users',user.uid);
        console.log(user.uid)
        const userInfo = await getDoc(docRef);

        if(userInfo.exists()){
          const loggedInUser:_user_ = {socialID:id, authProvider:"Email", creationTime:userInfo.get('creationTime'), albumIDs:userInfo.get('albumIDs')};
          console.log(loggedInUser);
          setLoginstate(loggedInUser);
          router.push(`/Gallery/${user.uid}`)
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

  const signIn_Google = (id: string, pw: string) =>{

  }

  const signIn_Apple = (id: string, pw: string) =>{


  }

  const signIn_Email = async (email:string, pw:string):Promise<{status:boolean, msg:string}> =>{
    
    let user;
    try{
    //create user credential
    const userCredential = await createUserWithEmailAndPassword(auth,email,pw)
    user = userCredential.user;
    }
    catch (error) {
      console.log(error);
      return {status:false, msg:'ERR_CRED'};
    }

    try{
      //create firebase user doc
    const user_doc = {
      socialID: email,
      authProvider: 'Email',
      creationTime: new Date(),
      albumIDs: [],
    }
    const docRef = doc(db,'Users',user.uid);
    await setDoc(docRef, user_doc);
    return {status:true, msg:'SUCCEED'};
    }
    catch (error){
      console.log(error);
      return {status:false, msg: 'ERR_DOC'}
    }

  }

  const login = () =>{
    // e.preventDefault();
    const id = idRef?.current?.value;
    const pw = pwRef?.current?.value;
    if(!id){
      setMsg('이메일/아이디를 입력해주세요');
      return false;
    }
    if(!pw){
      setMsg('비밀번호를 입력해주세요');
      return false;
    }

    const result = loginMethod == 'google' ? login_Google(id , pw)
    : loginMethod == 'apple' ? login_Apple(id, pw)
    : login_Email(id,pw);
  }

  const signIn = async () =>{
    const id = idRef?.current?.value.trim();
    const pw = pwRef?.current?.value.trim();
    const pwc = pwcRef?.current?.value.trim();
    
    if(!inputValidation(id,pw,pwc)){
      return;
    }

    // const result = loginMethod == 'google' ? await signIn_Google(id! , pw!)
    // : loginMethod == 'apple' ? await signIn_Apple(id!, pw!)
    // : await signIn_Email(id!,pw!)
    const result = await signIn_Email(id!,pw!);
    
    
    if(result.status == true){
      clearInput();
      setIsSigningIn(false);
      setMsg('정상적으로 가입되었습니다');
    }
    else if(result.msg == 'ERR_CRED'){
      console.log('creating credential error');
      setMsg('유저생성에 실패했습니다')
    }
    else if(result.msg == 'ERR_DOC'){
      console.log('creating User doc error');
      setMsg('유저생성에 실패했습니다')
    }
  }


  const inputCN = 'w-full h-12 border-solid border-[1px] p-2 px-4 m-1 border-pico_lighter box-border rounded-md text-black';
  return (
    <div className={`w-screen h-screen relative bg-pico_darker flex justify-center items-end ${nanumgothic.className}`}>
      
      <div className="(container) w-5/6 sm:w-96 h-3/4 relative flex flex-col items-center">
        <Image src={PiCologo} alt="logo" className="w-16 h-16 rotate-12"></Image>
        <form className="w-full h-max mt-10">
          <fieldset>
            <input className={inputCN} type='text' placeholder={loginMethod=="google" ? '구글 아이디' : loginMethod == 'apple' ? '애플 아이디' : '이메일'} ref={idRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
          <fieldset>
            <input className={inputCN} type='password' placeholder="비밀번호" ref={pwRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
          <fieldset className={`${!isSigningIn && 'invisible'}`}>
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
               onClick={isSigningIn ? signIn : login}>{isSigningIn ? '가입하기':'로그인'}</button>
        </div>
          <div className="flex flex-col mb-4 mt-auto">
          <Button onClick={()=>{}} className="text-1 leading-9 opacity-30 cursor-default">비밀번호 찾기</Button>
          <Button onClick={()=>{setIsSigningIn((prev)=>!prev)}} className="text-1 leading-9">{isSigningIn  ? '취소' : '가입하기'}</Button>
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