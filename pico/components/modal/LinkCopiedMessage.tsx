import styles from "@/styles/animation.module.css";

const LinkCopiedMessage = () => {
  return (
    <p className={`w-max h-max p-2 lg:py-2 py-1 rounded-md lg:text-xl text-[1rem] text-black bg-pico_blue ${styles.showmsg}`}>
      링크가 복사되었습니다.
    </p>
  );
};

export default LinkCopiedMessage;