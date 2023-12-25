import Image from "next/image";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import Button from "@/components/ui/Button";
import { _user_ } from "@/templates/user";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import arrow from '@/public/assets/images/arrow_back.svg';
import PiCologo from '@/public/assets/images/PiCo_Logo_white.svg';
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase/firebase";
import {  useEffect, useRef, useState } from "react";
import { OAuthProvider,signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { DocumentSnapshot, doc,getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement|null>(null);
  const pwRef = useRef<HTMLInputElement|null>(null);
  const pwcRef = useRef<HTMLInputElement|null>(null);
  const [isRegistering,setIsRegistering] = useState<boolean>(false);
  const [msg,setMsg] = useState<string>('');

  const clearInput = () =>{
    if(emailRef.current) emailRef.current.value = '';
    if(pwRef.current) pwRef.current.value = '';
    if(pwcRef.current) pwcRef.current.value = '';
  }

  const login_Google = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ display: 'popup',prompt:'select_account' });
    const auth = getAuth();
    signInWithPopup(auth,provider)
    .then( async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(result);
      const credential_ = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential!.accessToken;
      const id_token = credential_?.idToken;

      const credential = GoogleAuthProvider.credential(id_token);
      // The signed-in user info.
      const user_ = result.user;
      let user:_user_|undefined;
      const userRef = doc(db, 'Users', user_.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // This is the first time the user is registering
        user = {
          uid: user_.uid,
          email: '',
          authProvider: 'Google',
          creationTime: new Date(),
        };
        // Create a Firebase doc only if the user is registering for the first time
        await setDoc(userRef, user);
      }
  
      await signInWithCredential(auth,credential);
      router.push(`/Gallery/${user_.uid}`)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      console.log('errorCode: '+errorCode);
      console.log(errorMessage);
    });
    return;
  };

  const login_Apple = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    provider.setCustomParameters({
      locale: 'ko'
    });
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then(async (result) => {

      // Apple credential
      const credential_ = OAuthProvider.credentialFromResult(result);
      const accessToken = credential_?.accessToken;
      const idToken = credential_?.idToken;

      const user_ = result.user;
      let user:_user_|undefined;

      const userRef = doc(db, 'Users', user_.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // This is the first time the user is registering
        user = {
          uid: user_.uid,
          email: '',
          authProvider: 'Google',
          creationTime: new Date(),
        };

        // Create a Firebase doc only if the user is registering for the first time
        await setDoc(userRef, user);
      }
      // await signInWithCredential(auth,credential);
      router.push(`/Gallery/${user_.uid}`)
      
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The credential that was used.
      const credential = OAuthProvider.credentialFromError(error);
    });
  return;
  };
    

  const login_Email = async () => {
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
        return;
      }
    
      if(userInfo.exists()){
        const loggedInUser:_user_ = {
          uid:user.uid,
          email:id!,
          authProvider:"Email",
          creationTime:userInfo.get('creationTime')
        };
        // console.log(loggedInUser);
        sessionStorage.setItem('picoweb_loginState',JSON.stringify(loggedInUser));
        router.push(`/Gallery/${user.uid}`)
      }
      else{
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
      uid: user_.uid,
      email: email!,
      authProvider: 'Email',
      creationTime: new Date(),
    }

    clearInput();
    setIsRegistering(false);
    setMsg('정상적으로 가입되었습니다');
    //create firebase doc
    const docRef = doc(db,'Users',user.uid);
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

  useEffect(()=>{
    console.log('logged out');
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  },[]);


  const inputCN = 'w-full h-12 border-solid border-[1px] p-2 px-4 m-1 border-pico_lighter box-border rounded-md text-black';
  return (
    <div className={`w-screen h-screen relative bg-pico_darker flex justify-center items-end ${nanumgothic.className}`}>
      
      <div className="(container) w-5/6 sm:w-96 h-3/4 mb-16 relative flex flex-col items-center">
        <Image src={PiCologo} alt="logo" className="w-16 h-16 rotate-12"></Image>
        <form className="w-full h-max mt-10">
          <fieldset>
            <input className={inputCN} type='text' placeholder='이메일' ref={emailRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
          <fieldset>
            <input className={inputCN} type='password' placeholder="비밀번호" ref={pwRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
          <fieldset className={`${!isRegistering && 'invisible'}`}>
            <input className={inputCN} type='password' placeholder="비밀번호 확인" ref={pwcRef} onFocus={()=>{setMsg('')}}/>
          </fieldset>
        </form>
        <p className="h-7 m-2 text-lg">{msg}</p>
        
        <div className="(options) w-full flex-grow flex flex-col items-center ">
              <button className={`${inputCN} text-white hover:bg-white hover:text-black`} 
                 onClick={isRegistering ? register_Email : login_Email}>{isRegistering ? '가입하기':'로그인'}</button>

            <p className="mt-4">또는</p>
            <div className="(login method) flex h-max w-max gap-8 m-4">
                <span className={`w-16 h-16 rounded-full border-4 flex justify-center items-center cursor-pointer hover:scale-[105%]`}
                  onClick={login_Google}>
                  <FcGoogle className="w-10 h-10"/>
                </span>
                <span className={`w-16 h-16 rounded-full border-4 flex justify-center items-center cursor-pointer hover:scale-[105%]`}
                  onClick={login_Apple}>
                  <FaApple className="w-10 h-10 -translate-y-[2px]"/>
                </span>
            </div>
        </div>
        
          <div className="flex flex-col mt-auto">
          <Button onClick={()=>{}} className="text-1 leading-9 opacity-30 cursor-default">비밀번호 찾기</Button>
          <Button onClick={()=>{setIsRegistering((prev)=>!prev)}} className="text-1 leading-9">{isRegistering  ? '취소' : '가입하기'}</Button>
          </div>
        </div>
      
      <Image src={arrow} alt="back" className="w-8 h-8 fixed top-0 left-0 m-8 cursor-pointer"
      onClick={()=>router.push({pathname:'/'})}/>
      

    </div>
  );
};

export default Login;

// e.preventDefault(); router.push({pathname:'/Gallery/anyname'})