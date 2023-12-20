import { atom } from "recoil";

export const loginState = atom<user|null>({
    key: 'loginState',
    default:null
})