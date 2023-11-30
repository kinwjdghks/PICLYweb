import Album from "@/templates/Album"
import { atom } from "recoil"

export const curAlbumState = atom<Album|null>({
    key: 'curAlbum',
    default:null
})