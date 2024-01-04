import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";

type EmailLoginFormProps = {
  emailRef:MutableRefObject<HTMLInputElement | null>,
  pwRef:MutableRefObject<HTMLInputElement | null>,
  pwcRef:MutableRefObject<HTMLInputElement | null>,
  setMsg:Dispatch<SetStateAction<string>>,
  logInEmail:()=>void,
  isRegistering:boolean
}

const EmailLoginForm = ({emailRef,pwRef,pwcRef,setMsg,logInEmail,isRegistering}:EmailLoginFormProps): ReactNode => {
  const inputClassName =
    "w-full h-12 p-2 px-4 m-1 border-pico_lighter box-border rounded-md text-black outline-none";

  return (
    <form className="w-full h-max mt-10">
      <fieldset>
        <input className={inputClassName}
          type="text"
          placeholder="이메일"
          ref={emailRef}
          onFocus={() => {
            setMsg("");
          }}
          onKeyDown={(e) => {
            if ((e.key == "Enter" || e.keyCode == 13) && !isRegistering) {
              e.preventDefault();
              logInEmail();
            }
          }} />
      </fieldset>
      <fieldset>
        <input className={inputClassName}
          type="password"
          placeholder="비밀번호"
          ref={pwRef}
          onFocus={() => {
            setMsg("");
          }}
          onKeyDown={(e) => {
            if ((e.key == "Enter" || e.keyCode == 13) && !isRegistering) {
              e.preventDefault();
              logInEmail();
            }
          }}/>
      </fieldset>
      <fieldset className={`${!isRegistering && "invisible"}`}>
        <input className={inputClassName}
          type="password"
          placeholder="비밀번호 확인"
          ref={pwcRef}
          onFocus={() => {
            setMsg("");
          }}/>
      </fieldset>
    </form>
  );
};

export default EmailLoginForm;