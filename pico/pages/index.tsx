import Image from "next/image";
import logo from "@/public/assets/images/logo.png";
import logo_big from "@/public/assets/images/logo_big.svg";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

const Logos = () => {
  return (
    <>
      <Image
        alt="logo"
        src={logo_big}
        width={900}
        height={900}
        className="absolute lg:left-[5%] lg:top-[10%] left-[-55%] top-[10%]"
      />
      <Image
        alt="logo"
        src={logo_big}
        width={900}
        height={900}
        className="absolute lg:hidden left-[65%] top-[10%]"
      />
    </>
  );
};

const ActionBar = () => {
  const router = useRouter();
  return (
    <div className="(action) flex gap-20 mb-32">
      <Button
        onClick={() => {
          router.push({
            pathname: "/User/[userid]",
            query: { userid: 123 },
          });
        }}
        textsize="l"
      >
        Log in
      </Button>
      <Button
        onClick={() => {
          
        }}
        textsize="l"
      >
        About
      </Button>
    </div>
  );
};

export default function Home() {
  return (
    <div className="(mainpage) w-screen h-screen relative bg-pico_default flex overflow-hidden">
      <Logos />
      <div className="(leftside) w-full">
        {/* <Image src={logo} alt="logo" className="w-16 h-16 m-10" /> */}
      </div>
      <div className="(rightside) w-full flex flex-col-reverse items-center">
        <ActionBar />
      </div>
    </div>
  );
}
