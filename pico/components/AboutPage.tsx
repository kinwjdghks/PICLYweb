import { page } from "@/pages/Gallery/[userid]";
import nanumgothic from "@/public/assets/fonts/nanumgothic"
import { MdArrowBackIos } from "react-icons/md";


const AboutPage = ({close}:{close:(page:page)=>void}):React.ReactNode =>{
    const h2ClassName ='';

    return <div className={`lg:w-[calc(100%-16rem)] lg:right-0 w-screen lg:h-screen min-h-max absolute bg-pico_default flex flex-col ${nanumgothic.className}`}>
        <div className="w-full lg:p-12 p-8 flex items-center">
            <MdArrowBackIos className="lg:w-0 w-8 h-8 mr-2" onClick={()=>close('gallery')}/>
            <h1 className="lg:text-4xl text-3xl font-bold">서비스 정보</h1>
        </div>
        <div className="w-full h-full p-12 pt-0">
            <h2 className="text-2xl">앱 튜토리얼</h2>
            <div className=""></div>
            <h2 className="text-2xl">이용약관</h2>
            <div className=""></div>
            <h2 className="text-2xl">개인정보처리방침</h2>
            <div className=""></div>
            <h2 className="text-2xl">패치노트</h2>
            <div className=""></div>
            <h2 className="text-2xl">개발자 정보</h2>
            <div className=""></div>
            <h2 className="text-2xl">앱 다운로드</h2>
            <div className=""></div>
        </div>


    </div>
}

export default AboutPage;