import { poppins } from "@/public/assets/fonts/poppins";
import { overrideTailwindClasses as ovr } from "tailwind-override";
type btnprops = {
  onClick: () => void;
  children: any;
  className?: string;
  textsize?: "s" | "m" | "l";
};
const TSarr = {
  s: "text-xl ",
  m: "text-2xl ",
  l: "text-3xl ",
};

const Button = (props: btnprops) => {
  const TS = props.textsize ? TSarr[props.textsize] : '';
  const newClass =
    "text-center text-3xl leading-[4rem] hover:underline underline-offset-8 items-center " +
    TS +
    props.className;

  return (
    <button className={ovr(`${poppins.className} ${newClass}`)} onClick={(e)=>{e.preventDefault(); props.onClick()}}>
      {props.children}</button>
  );
};

export default Button;
