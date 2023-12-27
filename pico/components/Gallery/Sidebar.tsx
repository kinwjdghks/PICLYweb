
import { poppins } from "@/public/assets/fonts/poppins";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import appstore from "@/public/assets/images/appstore_download.png";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { page } from "@/pages/Gallery/[userid]";
import Image from "next/image";
import { auth } from "@/lib/firebase/firebase";
import { logout } from "@/pages/Login";

const Sidebar = ({switchPage}:{switchPage:(page:page)=>void}):React.ReactNode =>{
    

    return <div className="h-screen lg:w-64 w-0 left-0 top-0 flex flex-col lg:border-r-[1px] border-white bg-pico_default">
        <div className={`w-full text-center p-4 flex flex-col items-center ${poppins.className}  `}>
        <p className="text-[3rem] font-[600]">PiCo</p>
        <Image src={appstore} width={0} height={0} alt='appstore' className="w-32"/>
      </div>

      <ul className={`w-2/3 text-xl ml-[20%] mt-auto mb-20 ${nanumgothic.className}`}>
        <li className='flex items-center cursor-pointer' onClick={()=>switchPage('gallery')}>
            <BiSolidPhotoAlbum className='w-10 h-10 m-3'/>갤러리</li>
        <li className='flex items-center cursor-pointer' onClick={()=>switchPage('profile')}>
            <IoPersonSharp className='w-10 h-10 m-3'/>프로필</li>
        <li className='flex items-center cursor-pointer' onClick={()=>switchPage('about')}>
            <AiFillInfoCircle className='w-10 h-10 m-3'/>About</li>
        <li className='flex items-center cursor-pointer' onClick={logout}>
            <LuLogOut className='w-10 h-10 m-3'/>로그아웃</li>
      </ul>
    </div>
}

export default Sidebar;