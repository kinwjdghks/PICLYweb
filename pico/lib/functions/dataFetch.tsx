import { Album } from "@/templates/Album";
import { db } from "../firebase/firebase";
import { DocumentSnapshot, doc,getDoc } from "firebase/firestore";


export const getAlbumByID = async (albumID:string|undefined):Promise<Album|undefined> =>{
    if(!albumID) return;
    const albumRef = doc(db,'Albums',albumID);
    
    //get Album
    let album:Album;
    let getAlbum:DocumentSnapshot;
    try{
      getAlbum = await getDoc(albumRef);
    }catch(error){
      console.log(error);
      return;
    }
    
    if(getAlbum.exists()){
      album = {
        albumID: albumID,
        ownerID: getAlbum.get('ownerID') as string,
        creationTime: getAlbum.get('creationTime') as Date,
        expireTime: getAlbum.get('expireTime') as Date,
        tags: getAlbum.get('tags') as string[],
        imageURLs: getAlbum.get('imageURLs') as string[],
        imageCount: getAlbum.get('imageCount') as number,
        viewCount: getAlbum.get('viewCount') as number,
        };
    }
    else{
      console.log("Album not found");
      return;
    }
    return album;
  }