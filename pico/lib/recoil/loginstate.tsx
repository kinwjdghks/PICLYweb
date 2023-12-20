import { atom } from "recoil";
import { _user_ } from "@/templates/user";

export const loginState = atom<_user_|null>({
    key: 'loginState',
    default:null
})