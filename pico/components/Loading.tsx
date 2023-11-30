import { AiOutlineLoading3Quarters } from "react-icons/ai"
const LoadingPage = () =>{

    return <div className="w-full h-full bg-black flex justify-center items-center">
        <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin "/>
    </div>
}

export default LoadingPage;