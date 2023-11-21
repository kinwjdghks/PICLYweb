import { Poppins } from "next/font/google";
export const poppins = Poppins({ weight: "300", subsets: ["latin-ext"] });

type btnprops = {
  onClick: () => void;
  children: any;
  className?: string;
  textsize: "s" | "m" | "l";
};
const TSarr = {
  s: "text-xl ",
  m: "text-2xl ",
  l: "text-3xl ",
};

const Button = (props: btnprops) => {
  const TS = TSarr[props.textsize];
  const newClass =
    "cursor-pointer text-3xl text-center leading-[4rem] hover:underline underline-offset-8 " +
    TS +
    props.className;

  return (
    <div className={`${poppins.className} ${newClass}`} onClick={props.onClick}>
      <p>{props.children}</p>
    </div>
  );
};

export default Button;
