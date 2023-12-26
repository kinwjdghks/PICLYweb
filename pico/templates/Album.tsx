
export interface Album{
    albumID : string,
    ownerID : string,
    creationTime : Date,
    expireTime : Date,
    tags : string[],
    thumbnailURL?: string,
    imageURLs:string[],
    imageCount: number,
    viewCount : number,
}
