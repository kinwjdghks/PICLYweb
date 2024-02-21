import { page } from "@/pages/Gallery/[userid]";
import nanumgothic from "@/public/assets/fonts/nanumgothic"
import { MdArrowBackIos } from "react-icons/md";
import PageFrame from "./PageFrame";


const AboutPage = ({close}:{close:(page:page)=>void}):React.ReactNode =>{

    return (<PageFrame className={`lg:w-[calc(100%-16rem)] lg:right-0 w-screen absolute bg-picly_default flex flex-col ${nanumgothic.className}`}>
        <div className="w-full lg:p-12 p-8 flex items-center">
            <MdArrowBackIos className="lg:w-0 w-8 h-8 mr-2" 
              onClick={()=>close('gallery')}/>
            <h1 className="lg:text-4xl text-3xl font-bold">서비스 정보</h1>
        </div>
        <div className="w-full h-full p-12 pt-0">
            {/* <h2 className="text-2xl">앱 튜토리얼</h2> */}
            
          <h2 className="text-2xl py-2 w-fit hover:underline underline-offset-8 cursor-pointer">
            <a href="https://jdeoks.notion.site/5cc8688a9432444eaad7a8fdc4e4e38a"
               target="_blank">이용약관</a></h2>
        
          <h2 className="text-2xl py-2 w-fit hover:underline underline-offset-8 cursor-pointer">
            <a href="https://jdeoks.notion.site/bace573d0a294bdeae4a92464448bcac"
               target="_blank">개인정보처리방침</a></h2>
        
          <h2 className="text-2xl py-2 w-fit hover:underline underline-offset-8 cursor-pointer">패치노트</h2>
        
          <h2 className="text-2xl py-2 w-fit hover:underline underline-offset-8 cursor-pointer">
            <a href="https://jdeoks.notion.site/a747b302e36f4c369496e7372768d685"
               target="_blank">개발자 정보</a></h2>
        
          <h2 className="text-2xl py-2 w-fit hover:underline underline-offset-8 cursor-pointer">앱 다운로드</h2>
            
        </div>
    </PageFrame>);
}

export default AboutPage;