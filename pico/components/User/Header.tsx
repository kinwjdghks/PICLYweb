import Button from "../ui/Button";
import { poppins } from "../ui/Button";

const Header = () => {
  const userName = "kinwjdghks";

  return (
    <div className="w-screen h-24 bg-pico_darker fixed p-4">
      <div className="(content) flex">
        <div className="(userName) w-56">
          <p className={` ${poppins.className} leading-[4rem] text-center text-[2.2rem]`}>
            {userName}
          </p>
        </div>
        <div className="(actions) ml-40 flex gap-12">
          <Button onClick={() => {}} textsize="m">
            Profile
          </Button>
          <Button onClick={() => {}} textsize="m">
            Gallery
          </Button>
          <Button onClick={() => {}} textsize="m">
            Tutorial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
