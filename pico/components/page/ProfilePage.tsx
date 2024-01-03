import { auth } from "@/lib/firebase/firebase";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import { deleteUser, updatePassword } from "@firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRef, useState } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { MdArrowBackIos } from "react-icons/md";
import { page } from "@/pages/Gallery/[userid]";
import ViewPortAdapter from "./ViewPortAdapter";

const DeleteModal = ({deleteAccount,closeModal}:{deleteAccount:()=>void,closeModal:()=>void}):React.ReactNode =>{

    return <div className="w-1/3 h-1/3 bg-pico_default rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <p className={`text-4xl text-center p-6`} > 계정 삭제 확인</p>
        <p className="mt-10 text-xl">계정을 정말로 삭제하시겠습니까?</p>
        <div className="p-8 mt-auto">
            <button className="bg-red-400 px-4 py-2 rounded-lg mx-2" onClick={deleteAccount}>예</button>
            <button className="px-4 py-[0.6rem] bg-pico_darker rounded-lg mx-2" onClick={closeModal}>아니오</button>
        </div>
    </div>
}

const ProfilePage = ({albumCount,close}:{albumCount:number|undefined,close:(page:page)=>void}):React.ReactNode =>{
    const user = auth.currentUser;
    const userID = user?.email;
    const loginState = sessionStorage.getItem('picoweb_loginState');
    const authProvider = loginState ? JSON.parse(loginState).authProvider : '';
    const router = useRouter();
    const [msg,setMsg]=useState<string>('');
    const pwRef = useRef<HTMLInputElement>(null);
    const pwcRef = useRef<HTMLInputElement>(null);
    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState<boolean>(false);
    
    const inputClassName = 'w-2/3 lg:h-12 h-10 border-solid border-[1px] p-2 px-4 mb-2 border-pico_lighter box-border rounded-md text-black';
    
    const onPasswordChange = async (e:React.MouseEvent) =>{
        e.preventDefault();
        if(!pwRef.current || !pwcRef.current || !user) return;
        const pw = pwRef.current.value;
        const pwc = pwcRef.current.value;
        if(pw.length<6){
            setMsg('비밀번호는 최소 6자리여야 합니다');
            return;
        }
        if(pw != pwc){
            setMsg('비밀번호가 일치하지 않습니다');
            return;
        }

        try{
            await updatePassword(user,pw);
            setMsg('비밀번호가 재설정되었습니다');
            clear();
        }catch(error){
            if(error instanceof FirebaseError){
            console.log(error.code);
            console.log(error.message);
            switch (error.code) {
                case 'auth/requires-recent-login':
                    setMsg('재로그인 후 시도해주세요');
                    break;
            
                default:
                    break;
            }
   
         }
        }


    }
    const clear =() =>{
        if(pwRef.current && pwcRef.current){
            pwRef.current.value = '';
            pwcRef.current.value = '';    
        }
    }

    const onDeleteAccount = async () =>{
        if(!user) return;
        try{
            await deleteUser(user);
            router.push('/');
        }catch(error){
            console.log(error);
        }
    }
    
    return <ViewPortAdapter className={`lg:w-[calc(100%-16rem)] lg:right-0 w-screen lg:h-screen min-h-max absolute bg-pico_default flex flex-col ${nanumgothic.className}`}>
            <div className="w-full lg:p-12 p-8 flex items-center">
                <MdArrowBackIos className="lg:w-0 w-8 h-8 mr-2" onClick={()=>close('gallery')}/>
                <h1 className="lg:text-4xl text-3xl font-bold">계정관리</h1>
            </div>
            <div className="w-full relative flex-grow flex lg:flex-row flex-col">
                <div className="lg:p-12 p-8 lg:w-1/2 w-full flex flex-col box-border lg:border-r-[1px] lg:border-b-0 border-b-[1px] border-white">
                    <label className="text-2xl">로그인 정보</label>
                    <p className="text-xl font-bold p-2">{authProvider}로 로그인</p>
                    <label className="pt-4 text-2xl">계정 이메일</label>
                    <p className="text-xl font-bold p-2">{userID}</p>
                    <label className="pt-4 text-2xl">앨범</label>
                    <p className="text-xl font-bold p-2">{albumCount}</p>
                </div>
                <div className="lg:p-12 p-8 lg:w-1/2 w-full flex flex-col">
                    <form className="w-full">
                    <label className="text-2xl">비밀번호 변경</label>
                    <fieldset className="mt-4">
                        <input className={inputClassName} type='password' placeholder="새 비밀번호" ref={pwRef} onFocus={()=>{setMsg('')}}/>
                        <input className={inputClassName} type='password' placeholder="비밀번호 확인" ref={pwcRef} onFocus={()=>{setMsg('')}}/>
                    </fieldset>
                    <button className="py-2 px-3 mt-8 border-2 bg-white text-black rounded-lg font-bold" onClick={(e)=>onPasswordChange(e)}>변경</button>
                    <p className="h-16 p-4">{msg}</p>
                    </form>
                    <button className="w-fit py-2 px-3 lg:mt-auto mt-16 bg-red-300 text-black rounded-lg font-bold" onClick={(e)=>{e.preventDefault();setIsDeleteModalOpen(true)}}>회원 탈퇴</button>
                </div>
            </div>
            {isDeleteModalOpen && <Modal><DeleteModal deleteAccount={onDeleteAccount} closeModal={()=>{setIsDeleteModalOpen(false)}}/></Modal>}
        </ViewPortAdapter>

}

export default ProfilePage;
