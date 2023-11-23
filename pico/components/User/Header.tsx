import { useRouter } from "next/router";
import Button from "../ui/Button";
import { poppins } from "@/public/assets/fonts/poppins";

const Header = () => {
  const userName = "kinwjdghks";
  const router = useRouter();

  return (
    <div className="w-screen h-24 bg-pico_darker fixed p-4 z-[999]">
      <div className="(content) flex">
        <div className="(userName) w-56">
          <p className={` ${poppins.className} leading-[4rem] text-center text-[2.2rem]`}>
            {userName}
          </p>
        </div>
        <div className="(actions) ml-40 flex gap-12">
          <Button onClick={() => {}} textsize="l">
            Profile
          </Button>
          <Button onClick={() => {
            router.push({
              pathname: "/Gallery/[userid]",
              query: { userid: 'arbitrary' },
            });
          }} textsize="l">
            Gallery
          </Button>
          <Button onClick={() => {}} textsize="l">
            Tutorial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
