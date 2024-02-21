import styles from "@/styles/animation.module.css";
import { ReactNode } from "react";

const AlertMessage = ({children}:{children:ReactNode}) => {
  return (
    <p className={`w-max h-max p-2 lg:py-2 py-1 rounded-md lg:text-xl text-[1rem] text-black bg-picly_blue ${styles.showmsg}`}>
      {children}
    </p>
  );
};

export default AlertMessage;