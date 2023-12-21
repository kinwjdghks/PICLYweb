import Album from "@/templates/Album";
import { db,storage } from "../firebase/firebase";
import { DocumentSnapshot, doc,getDoc } from "firebase/firestore";
import { ListResult, getDownloadURL, listAll, ref } from "firebase/storage";

export const formatDateString = (date:Date):string=> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}.${month}.${day}`;
  }

export const formatTimeString = (date:Date):string=> {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

 export const dateDiffAsString = (date1:Date, date2:Date):string =>{
    if(!(date1 instanceof Date && date2 instanceof Date)) return 'not defined';
    const timeDifference = Math.abs(date1.getTime() - date2.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    let result = '';
  
    if (daysDifference > 0) {
      result += `${daysDifference}d `;
    }
  
    if (hoursDifference > 0) {
      result += `${hoursDifference}h`;
    }
  
    if (result === '') {
      return '0h';
    }
  
    return result;
  }

  export const getEntireAlbum = async (albumURL:string|undefined):Promise<Album|undefined> =>{
    // console.log('getEntireAlbum albumURL:'+albumURL);
    if(!albumURL) return;
    const albumRef = doc(db,'Albums',albumURL);
    
    //get Album
    let album:Album;
    let getAlbum:DocumentSnapshot
    try{
      getAlbum = await getDoc(albumRef);
    }catch(error){
      console.log(error);
      return;
    }
    
    if(getAlbum.exists()){
      album = new Album({
        albumURL:getAlbum.get('albumURL') as string,
        creationTime:getAlbum.get('creationTime') as Date,
        expireTime:getAlbum.get('expireTime') as Date,
        tags:getAlbum.get('tags') as string[],
        imageURLs:[],
        viewCount:getAlbum.get('viewCount') as number
        }
      );
    }
    else{
      console.log("Album not found");
      return;
    }

    //get imageURLs
    const albumSRef = ref(storage, albumURL);
    let dataList:ListResult;
    try{
    dataList = await listAll(albumSRef);
    }catch(error){
      console.log(error);
      return;
    }
    const imageURLs = await Promise.all(
      dataList.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return downloadURL;
      })
    );
    album.editImageURLs= imageURLs;
    return album
  }