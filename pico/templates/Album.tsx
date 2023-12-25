
export interface Album{
    albumID ?: string,
    ownerID : string,
    creationTime : Date,
    expireTime : Date,
    tags : string[],
    thumbnail?: string|File,
    images?:string[],
    imageCount: number,
    viewCount : number,
}
