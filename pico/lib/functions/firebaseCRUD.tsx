import { Album, AlbumProps, imageSize } from "@/templates/Album";
import { db, storage } from "../firebase/firebase";
import { DocumentData, DocumentSnapshot, addDoc, collection, deleteDoc, doc,getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageCompressGetFile } from "./imageCompress";

enum CollectionName {
  albums = "Albums",
  users = "Users",
}

const getCollectionRef = (collectionName: CollectionName) =>{
  return collection(db, collectionName);
}

const getDocRef = (collectionName: CollectionName, docId: string) => {
  return doc(db, collectionName, docId);
}

const getStorageRef = (objectName: string) =>{
  return ref(storage,objectName);
}

// Read functions
export const getAlbumByID = async (albumID:string|undefined):Promise<Album|undefined> =>{
  if(!albumID) return undefined;
  const albumRef = getDocRef(CollectionName.albums, albumID);
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
    album = new Album(getAlbum);
  }
  else{
    console.log("Album not found");
    return;
  }
  return album;
}

export const getAllAlbumsByID = async (uid:string) =>{
  console.log("getAllAlbumsByID executed");
  const albumQuery = query(getCollectionRef(CollectionName.albums), where(AlbumProps.ownerID, '==', uid), orderBy(AlbumProps.creationTime,'desc'));
  
  try {
    const querySnapshot = await getDocs(albumQuery);

    const fetchAlbum:Promise<Album>[] = querySnapshot.docs.map(async (doc) => {
      const albumData :DocumentData= doc.data();
      const album = new Album(albumData as DocumentSnapshot);
      return album;
    });
    const userAlbums:Album[] = await Promise.all(fetchAlbum);
    return userAlbums;
  } catch (error) {
    console.error(error);
    return [];
  }
}

  // Create functions
export const createAlbum = async (ownerID:string,expireTime:Date,tags:string[],imgFiles:File[],imageSizes:imageSize[]): Promise<Album|undefined> =>{
  //create album and post
  let album:Album = {
      albumID:'',
      ownerID: ownerID,
      creationTime: new Date(),
      expireTime: expireTime,
      tags: tags,
      thumbnailURL:'',
      imageURLs:[],
      imageCount:imgFiles.length,
      viewCount: 0,
      imageSizes: imageSizes,
  };
  let albumID:string;
  try{
    const doc = await addDoc(getCollectionRef(CollectionName.albums), album);
    albumID = doc.id;
  }catch(error){
    console.log(error);
    return;
  }

  //generate thumbnail
  const thumbnailRef = getStorageRef(`${albumID}/thumbnail.jpeg`);
  let thumbnailURL:string = '';
  const metadata = {
    contentType: 'image/jpeg',
  };
  try{
    const thumbnail = await imageCompressGetFile(0.3,1920,imgFiles[0]);
    await uploadBytes(thumbnailRef,thumbnail!,metadata);
    thumbnailURL = await getDownloadURL(thumbnailRef);
  }catch(error){
    console.log(error);
  }

  //post imageURLs
  const imageURLs:string[] = [];
  try {
    // Create an array of promises for uploading image files
    const uploadPromises = imgFiles.map(async (imgFile, i) => {
      if(imgFile == null) return null;
      const fileName = `${albumID}/${i}.jpeg`; // Generate a unique file name
      const imageRef = getStorageRef(fileName);
      await uploadBytes(imageRef, imgFile, metadata);
      const imageURL = await getDownloadURL(imageRef);
      return imageURL;
    });
    // Wait for all uploads to complete
    const imgURLs:(string | null)[] = await Promise.all(uploadPromises);
    imageURLs.push(...imgURLs.filter(url => url !== null) as string[]);
  } catch (error) {
    console.error('Error uploading images:', error);
  }
    const tempImagesURL = imgFiles.map((image)=>URL.createObjectURL(image));
    // console.log(imageURLs);
    await updateDoc(getDocRef(CollectionName.albums,albumID),{
      albumID:albumID,
      thumbnailURL: thumbnailURL,
      imageURLs: imageURLs
    })
    album = {...album,
      albumID:albumID,
      thumbnailURL: tempImagesURL[0], 
      imageURLs: tempImagesURL
    };
    return album;
}

//Update functions
export const updateViewCount = async (albumID:string, newViewCount:number) =>{
  await updateDoc(getDocRef(CollectionName.albums,albumID),{
    viewCount: newViewCount
  });
}

// Delete functions
const deleteAlbumImages = async (album:Album) => {
  if (!album) return;

  const albumID = album.albumID;
  const imageURLs:string[] = album.imageURLs.map((album,idx)=> `${albumID}/${idx}.jpeg`);
  imageURLs.push(`${albumID}/thumbnail.jpeg`);

  try {
    // Delete each image from Cloud Storage
    const deleteImagePromises = imageURLs.map(async (imageURL) => {
      const imageRef = getStorageRef(imageURL);
      await deleteObject(imageRef);
    });
    // Wait for all image deletions to complete
    await Promise.all(deleteImagePromises);
  } catch (error) {
    console.error(error);
  }
};

const deleteAlbumDoc = async (album:Album) => {
  if(!album) return;

  const albumID = album.albumID;
  const albumRef = getDocRef(CollectionName.albums,albumID);
  await deleteDoc(albumRef);
}
  
export const deleteAlbum = async (album:Album) =>{
  await deleteAlbumImages(album);
  await deleteAlbumDoc(album);
}