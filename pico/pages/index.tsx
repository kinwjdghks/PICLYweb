import Image from "next/image";
import logo from "@/public/assets/images/logo.png";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="(mainpage) w-screen h-screen bg-pico_default flex">
      <div className="(leftside) w-full">
        <Image src={logo} alt="logo" className="w-16 h-16 m-10" />
      </div>

      <div className="(rightside) w-full flex flex-col-reverse items-center">
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
          <Button onClick={() => {}} textsize="l">
            About
          </Button>
        </div>
      </div>
    </div>
  );
}
