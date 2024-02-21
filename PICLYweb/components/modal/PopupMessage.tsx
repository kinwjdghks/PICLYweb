import styles from "@/styles/animation.module.css";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";

type PopupMessageProps = {
  children: ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  ellapseTime: number;
  className?: string;
  callback?: (param?: any) => void;
  cleanup?: (param?: any) => void;
};

const PopupMessage = ({ children, show, setShow, ellapseTime,className, callback = () => {},cleanup = () =>{},
}: PopupMessageProps): ReactNode => {
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (show === true) {
      messageShowHandler();
    }
  }, [show]);

  const messageShowHandler = () => {
    if (timerRef.current !== null) {
      return;
    }
    callback();
    timerRef.current = setTimeout(() => {
      setShow(false);
      clearTimeout(timerRef.current!);
      timerRef.current = null;
      cleanup();
    }, ellapseTime);
  };
  return show ? (
    <div className={`${className}`}>
      <div className={`${styles.showmsg}`}></div>
      {children}
    </div>
  ) : (
    <></>
  );
};

export default PopupMessage;
