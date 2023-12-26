import { Album } from "@/templates/Album";
import { db,storage } from "../firebase/firebase";
import { DocumentSnapshot, doc,getDoc } from "firebase/firestore";
import { ListResult, getDownloadURL, listAll, ref, getBytes } from "firebase/storage";

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

  //need for random access
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
  
  // export const getThumbNailByID = async (albumID:string|undefined):Promise<string|undefined> =>{
  //   if (!albumID) {
  //     return undefined;
  //   }
  //   try {
  //     const thumbnail = await getDownloadURL(ref(storage, `${albumID}/thumbnail.jpeg`));
  //     return thumbnail;
  //   } catch (error) {
  //     console.error('Error fetching thumbnail:', error);
  //     return undefined;
  //   }
  // }

  // export const getImagesByID = async (albumID: string | undefined): Promise<string[] | undefined> => {
  //   if (!albumID) {
  //     return undefined;
  //   }
  
  //   const albumSRef = ref(storage, albumID);
  //   let dataList: ListResult;
  
  //   try {
  //     dataList = await listAll(albumSRef);
  //   } catch (error) {
  //     console.log(error);
  //     return undefined;
  //   }
  
  //   const imageUrls: string[] = [];
  //   const downloadPromises: Promise<void>[] = [];
  
  //   // Start downloading download URLs in parallel
  //   dataList.items.forEach((item) => {
  //     if (item.name !== 'thumbnail.jpeg') {
  //       const downloadPromise = getDownloadURL(item)
  //         .then((downloadURL) => {
  //           imageUrls.push(downloadURL);
  //         })
  //         .catch((error) => {
  //           console.error(`Error fetching download URL for ${item.name}: ${error}`);
  //         });
  
  //       downloadPromises.push(downloadPromise);
  //     }
  //   });
  
  //   try {
  //     // Wait for all download promises to complete
  //     await Promise.all(downloadPromises);
  //   } catch (error) {
  //     console.error('Error downloading images:', error);
  //     return undefined;
  //   }
  
  //   return imageUrls;
  // };
  
  