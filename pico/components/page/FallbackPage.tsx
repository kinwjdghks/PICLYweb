import { ReactNode } from "react";

const FallbackPage = ():ReactNode => {

    return <div className="w-screen h-screen bg-black items-center relative">
        <p className="w-full mt-[25%] text-center text-2xl">데이터를 찾을 수 없습니다</p>
    </div>
}

export default FallbackPage;