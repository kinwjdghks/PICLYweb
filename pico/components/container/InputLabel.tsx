import { ReactNode } from "react"

export const InputLabel = ({children}:{children:ReactNode}):ReactNode =>{
    return <p className="w-full font-bold p-1 mt-2">{children}</p>
}