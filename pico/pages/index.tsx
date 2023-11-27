import Image from "next/image";
import logo_big_bright from "@/public/assets/images/logo_big_bright.svg";
import Button from "@/components/ui/Button";
import nanumgothic from "@/public/assets/fonts/nanumgothic";
import { useRouter } from "next/router";
import { poppins } from "@/public/assets/fonts/poppins";
import styles from '@/styles/icons.module.css';

const Logos = () => {
  return (
    <>
      <Image
        alt="logo"
        src={logo_big_bright}
        className={`lg:absolute lg:w-[40%] lg:h-[40%] lg:min-w-[40rem] lg:min-h-[40rem] lg:left-[10%] lg:top-20 hidden lg:block lg:rotate-6`}
      />
      <Image
      alt="logo"
      src={logo_big_bright}
      className={`w-28 h-28 mt-20 lg:hidden`}
    />
    </>
  );
};

const ActionBar = () => {
  const router = useRouter();
  return (
    <div className="(action) w-full h-max flex flex-col mb-16 p-3 gap-6 lg:w-1/2 lg:justify-center lg:mb-0 lg:items-center">
      <Button onClick={() => {}} textsize="l" >
        <div className={`${styles.proceed} lg:w-max lg:pr-[50%]`}>See More</div>
      </Button>
      <Button onClick={() =>router.push({pathname: "/Login",query: { userid: 123 }})} textsize="l">
        <div className={`${styles.proceed} lg:w-max lg:pr-[50%]`}>Log in</div>
        </Button>
    </div>
  );
};

export default function Home() {
  const gradient = 'bg-gradient-to-b from-black to-[#444452] from-0%to-100%';
  return (
    <div className="(mainpage) w-screen h-max relative bg-black flex flex-col align-middle overflow-hidden">
      <div className="(content) w-full flex-grow flex flex-col  align-middle items-center
        lg:h-[70vh] lg:flex-row-reverse">
      <Logos />
       
      <div className={`(container) lg:w-1/2 w-full h-full p-12 pt-20 text-center ${nanumgothic.className}`}>
        <h1 className={`text-[2.5rem] ${poppins.className} lg:text-[5rem]`}>PiCo:</h1>
        <h2 className="text-xl lg:text-3xl">손쉬운 익명 사진 공유</h2>
        <h3 className="p-8 pt-12 leading-[1.8rem] lg:text-xl lg:leading-[2.5rem]">PiCo는 사진을 빠르고 안전하게 공유하는 새로운 방법입니다.<br/>익명으로 사진을 업로드하고,<br/> 링크를 통해 손쉽게 공유하세요.</h3>
      </div>
      </div>
      <div className="lg: flex flex-row-reverse">
      <ActionBar />
      </div>
      <div className={`(gradientbox) w-screen h-[25vh] lg:h-[80vh] ${gradient}`}></div>
      <div className={`(details) w-full h-max bg-pico_default flex flex-col items-center overflow-auto`}>
        <div className={`(manual) w-11/12 lg:w-[40rem] h-[90vh] border-solid border-2 border-white box-border rounded-xl mt-16`}></div>
        <div className={`(manual) w-11/12 lg:w-[40rem] h-[90vh] border-solid border-2 border-white box-border rounded-xl my-16`}></div>
      </div>
    </div>
  );
}
