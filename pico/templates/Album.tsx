
export interface Album{
    albumID ?: string,
    ownerID : string,
    creationTime : Date,
    expireTime : Date,
    tags : string[],
    thumbnail: string,
    imageCount: number,
    viewCount : number,
}
