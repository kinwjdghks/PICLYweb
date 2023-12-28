import { Album } from "@/templates/Album";
import { db } from "../firebase/firebase";
import { DocumentSnapshot, collection, doc,getDoc, getDocs, orderBy, query, where } from "firebase/firestore";


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

  export const getAllAlbumsByID = async (uid:string) =>{
    console.log("getAllAlbumsByID executed");
    const albumQuery = query(collection(db, 'Albums'), where('ownerID', '==', uid),orderBy('creationTime','desc'));
    
    try {
      const querySnapshot = await getDocs(albumQuery);
  
      const fetchAlbum:Promise<Album>[] = querySnapshot.docs.map(async (doc) => {
        const albumData = doc.data();
  
        const album: Album = {
          albumID: doc.id || '',
          ownerID: albumData.ownerID || '',
          creationTime: albumData.creationTime.toDate(),
          expireTime: albumData.expireTime.toDate(),
          tags: albumData.tags || [],
          thumbnailURL: albumData.thumbnailURL || '',
          imageURLs: albumData.imageURLs || [],
          imageCount: albumData.imageCount || 0,
          viewCount: albumData.viewCount || 0,
        };
  
        return album;
      });
      const userAlbums:Album[] = await Promise.all(fetchAlbum);
      return userAlbums;
    } catch (error) {
      console.error(error);
      return [];
    }
  }