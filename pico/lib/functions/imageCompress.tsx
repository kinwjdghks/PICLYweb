import imageCompression from "browser-image-compression";

export const imageCompressGetAll = async (maxSizeMB:number,maxWidthOrHeight:number,file:File):Promise<{compressedFile:File,previewURL:string}|undefined> => {
  const options = {
    maxSizeMB: maxSizeMB, // 이미지 최대 용량
    maxWidthOrHeight: maxWidthOrHeight, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const previewURL = await imageCompression.getDataUrlFromFile(compressedFile);
    return {compressedFile:compressedFile,previewURL:previewURL}
  } catch (error) {
    console.log(error)
    return undefined;
  }
};

export const imageCompressGetURL = async (maxSizeMB:number,maxWidthOrHeight:number,file:File):Promise<File|undefined> => {
  const options = {
    maxSizeMB: maxSizeMB, // 이미지 최대 용량
    maxWidthOrHeight: maxWidthOrHeight, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error)
    return undefined;
  }
};

export const imageCompressGetFile = async (maxSizeMB:number,maxWidthOrHeight:number,file:File):Promise<File|undefined> => {
  const options = {
    maxSizeMB: maxSizeMB, // 이미지 최대 용량
    maxWidthOrHeight: maxWidthOrHeight, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error)
    return undefined;
  }
};