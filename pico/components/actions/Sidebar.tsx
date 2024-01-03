
import { poppins } from "@/public/assets/fonts/poppins";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import appstore from "@/public/assets/images/DownloadAppstore.svg";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { page } from "@/pages/Gallery/[userid]";
import Image from "next/image";
import { logout } from "@/pages/Login";

const Sidebar = ({switchPage}:{switchPage:(page:page)=>void}):React.ReactNode =>{
    
    return <div className="lg:h-screen min-h-max h-[calc(var(--vh, 1vh) * 100)] lg:w-64 w-0 left-0 top-0 flex flex-col lg:border-r-[1px] border-white bg-pico_default">
        <div className={`w-full text-center p-4 flex flex-col items-center ${poppins.className}  `}>
        <p className="text-[3rem] font-[600]" draggable='false'>PiCo</p>
        <Image src={appstore} width={0} height={0} alt='appstore' className="w-28" draggable='false'/>
      </div>

      <ul className={`w-2/3 text-xl ml-[20%] mt-auto mb-20 ${nanumgothic.className}`}>
        <li className='flex items-center cursor-pointer' onClick={()=>switchPage('gallery')}>
            <BiSolidPhotoAlbum className='w-8 h-8 m-3'/>갤러리</li>
        <li className='flex items-center cursor-pointer' onClick={()=>switchPage('profile')}>
            <IoPersonSharp className='w-8 h-8 m-3'/>프로필</li>
        <li className='flex items-center cursor-pointer' onClick={()=>switchPage('about')}>
            <AiFillInfoCircle className='w-8 h-8 m-3'/>서비스 정보</li>
        <li className='flex items-center cursor-pointer' onClick={logout}>
            <LuLogOut className='w-8 h-8 m-3'/>로그아웃</li>
      </ul>
    </div>
}

export default Sidebar;