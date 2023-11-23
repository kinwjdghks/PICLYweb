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
    <div className="(action) w-full h-max flex place-content-between mb-32 px-16">
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
      <Button onClick={() => {}} textsize="l">
        About
      </Button>
    </div>
  );
};

export default function Home() {
  const gradient = '';
  return (
    <div className="(mainpage) w-screen h-[200vh] relative bg-black flex flex-col align-middle overflow-hidden">
      {/* <Logos /> */}
      <div className="(content) w-full flex-grow ">
        
      </div>
      <ActionBar />
      <div className="(details) w-full h-[100vh] bg-gradient-to-b from-black via-[pico_default] to-[pico_default] from-0% via-20% to-100%">
      
      </div>
    </div>
  );
}
