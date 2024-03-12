import Image from "next/image";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import { _user_ } from "@/templates/user";
import AppstoreImg from "@/public/assets/images/DownloadAppstore.svg";
import arrow from '@/public/assets/images/arrow_back.svg';
import PICLYLogo from '@/public/assets/images/PICLY_Logo_white.svg';
import { useRouter } from "next/router";
import {  useEffect, useRef, useState } from "react";
import { signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { auth } from "@/lib/firebase/firebase";
import { DocumentSnapshot, doc,getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import PageFrame from "./PageFrame";
import EmailLoginForm from "../form/EmailLoginForm";
import { useBodyScrollLock } from "@/lib/functions/scrollLock";
import { createDefaultAlbum } from "@/lib/functions/firebaseCRUD";

export const logout = async () =>{
  const auth = getAuth();
  console.log('logged out');
  sessionStorage.removeItem('piclyweb_loginState');
  signOut(auth).then(() => {
  }).catch((error) => {
    console.log(error);
  });
}

const LoginPage = () => {
  //constants
  const errorCodeMsg = {
    "auth/invalid-credential": "이메일 혹은 비밀번호가 일치하지 않습니다.",
    "auth/email-already-in-use":"이미 사용 중인 이메일입니다.",
    "auth/weak-password":"비밀번호는 6글자 이상이어야 합니다.",
    "auth/network-request-failed":"네트워크 연결에 실패하였습니다.",
    "auth/invalid-email":"잘못된 이메일 형식입니다.",
    "auth/internal-error":"잘못된 요청입니다.",
    "auth/too-many-requests":"잠시 후에 다시 시도해주세요."

  }

  //useState
  const [isRegistering,setIsRegistering] = useState<boolean>(false);
  const [msg,setMsg] = useState<string>('');

  //useRef
  const emailRef = useRef<HTMLInputElement|null>(null);
  const pwRef = useRef<HTMLInputElement|null>(null);
  const pwcRef = useRef<HTMLInputElement|null>(null);

  //useRouter
  const router = useRouter();

  //useEffect
  useEffect(()=>{
    logout();
  },[]);

  useEffect(()=>{
    lockScroll();
    return () => openScroll();
  },[]);

  //functions
  const { lockScroll, openScroll } = useBodyScrollLock();

  const clearInput = () =>{
    if(emailRef.current) emailRef.current.value = '';
    if(pwRef.current) pwRef.current.value = '';
    if(pwcRef.current) pwcRef.current.value = '';
  }

  const logInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        const credential_ = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        const id_token = credential_?.idToken;

        console.log(credential_);

        // const credential = GoogleAuthProvider.credential(id_token);
        // // The signed-in user info.
        // const user_ = result.user;
        // let user:_user_|undefined;
        // const userRef = doc(db, 'Users', user_.uid);
        // const userDoc = await getDoc(userRef);

        // if (!userDoc.exists()) {
        //   // This is the first time the user is registering
        //   user = {
        //     // uid: user_.uid,
        //     email: '',
        //     authProvider: 'google',
        //     creationTime: new Date(),
        //   };
        //   // Create a Firebase doc only if the user is registering for the first time
        //   await setDoc(userRef, user);
        // }
    
        // await signInWithCredential(auth,credential);
        // router.push(`/Gallery/${user_.uid}`)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log('errorCode: '+errorCode);
        console.log(errorMessage);
      });
    return;
  };

  const logInEmail = async () => {
    const id = emailRef?.current?.value.trim();
    const pw = pwRef?.current?.value.trim();
    let userInfo:DocumentSnapshot;
    let user;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, id!, pw!);
    user = userCredential.user;  
    const docRef = doc(db,'Users',user.uid);
    console.log(user.uid)
    userInfo = await getDoc(docRef);

    // createDefaultAlbum(user.uid);
  } catch (error) {
    if(error instanceof FirebaseError){
      console.log(error.code);
      setMsg(errorCodeMsg[error.code as keyof typeof errorCodeMsg]);
    }
    return;
  }

  if(userInfo.exists()){
    const loggedInUser:_user_ = {
      // uid:user.uid,
      email:id!,
      authProvider:"Email",
      creationTime:userInfo.get('creationTime')
    };
    // console.log(loggedInUser);
    sessionStorage.setItem('piclyweb_loginState',JSON.stringify(loggedInUser));
    router.push(`/Gallery/${user.uid}`)
  }else{
    setMsg('유저정보가 존재하지 않습니다');
  }
  };

  const register_Email = async () =>{
    const email = emailRef?.current?.value.trim();
    const pw = pwRef?.current?.value.trim();
    const pwc = pwcRef?.current?.value.trim();

    if(pw !== pwc){
      setMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    let user_;
    try{
    //create user credential
    const userCredential = await createUserWithEmailAndPassword(auth,email!,pw!);
    user_ = userCredential.user;
      
    const user:_user_ = {
      // uid: user_.uid,
      email: email!,
      authProvider: 'Email',
      creationTime: new Date(),
    }

    clearInput();
    createDefaultAlbum(user_.uid);
    setIsRegistering(false);
    setMsg('정상적으로 가입되었습니다');
    //create firebase doc
    const docRef = doc(db,'Users',user_.uid);
    setDoc(docRef, user);

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
      else console.log(error)
    }
  }

  const inputClassName = 'w-full h-12 p-2 px-4 m-1 border-picly_lighter box-border rounded-md text-black outline-none';
  return (
    <PageFrame className={`w-screen p-12 lg:px-[40%] lg:py-[5%] relative bg-picly_darker flex justify-center overflow-hidden ${nanumgothic.className}`}>
      <div className="(container) w-full relative flex flex-col items-center">
        <Image src={PICLYLogo} alt="logo" className="w-16 h-16 rotate-12"/>

        <EmailLoginForm
          emailRef={emailRef}
          pwRef={pwRef}
          pwcRef={pwcRef}
          setMsg={setMsg}
          logInEmail={logInEmail}
          isRegistering={isRegistering}/>
        
        <p className="h-7 m-2 text-md">{msg}</p>

        <div className="(options) w-full flex-grow flex flex-col items-center ">

          <button className={`${inputClassName} border-[1px] text-white hover:bg-white hover:text-black`} 
            onClick={isRegistering ? register_Email : logInEmail}>{isRegistering ? '가입하기':'로그인'}
          </button>
          {/* <p className="mt-4">또는</p>
          
          <div className="flex h-max w-full mt-4 items-center">
            <button className={`${inputClassName} border-[1px] mx-0 pr-12 text-white hover:bg-white hover:text-black flex items-center`}
              onClick={logInGoogle}>
                <FcGoogle className="w-8 h-8"/>
                <p className="mr-auto ml-auto">구글로 계속하기</p>
            </button>

          </div> */}
        <a className="mt-8" 
          href="https://apps.apple.com/kr/app/picly-%ED%94%BC%ED%81%B4%EB%A6%AC/id6478313847"
          target='_blank'> 
          <Image src={AppstoreImg} alt="appstore" className="w-28 " />    
        </a>
        </div>
        <div className="flex flex-col mt-auto">
          <button onClick={()=>{}} className="text-center hover:underline underline-offset-8 items-center text-1 lead ing-9 opacity-30 cursor-default">비밀번호 찾기</button>
          <button onClick={()=>{setIsRegistering((prev)=>!prev)}} className="text-center hover:underline underline-offset-8 items-center leading-9">{isRegistering  ? '취소' : '가입하기'}</button>
        </div>
      </div>
      <Image src={arrow} alt="back" className="w-8 h-8 fixed top-0 left-0 m-4 lg:m-8 cursor-pointer"
        onClick={()=>router.push({pathname:'/'})}/>
    </PageFrame>
    );
  };

  export default LoginPage;
