import { DocumentData, Timestamp } from "firebase/firestore";

export enum AlbumProps {
    albumID = 'albumID',
    ownerID = 'ownerID',
    creationTime = 'creationTime',
    expireTime = 'expireTime',
    tags = 'tags',
    thumbnailURL = 'thumbnailURL',
    imageURLs = 'imageURLs',
    imageCount = 'imageCount',
    viewCount = 'viewCount',
}

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

export class Album {
    public albumID : string;
    public ownerID : string;
    public creationTime : Date;
    public expireTime : Date;
    public tags : string[];
    public thumbnailURL?: string;
    public imageURLs:string[];
    public imageCount: number;
    public viewCount : number;

    constructor(album1?: DocumentData, album2?: Album) {
        this.albumID = album1?.[AlbumProps.albumID] as string
            ?? album2?.albumID
            ?? '';
        this.ownerID = album1?.[AlbumProps.ownerID] as string
            ?? album2?.ownerID
            ?? '';
        this.creationTime = (album1?.[AlbumProps.creationTime] as Timestamp)?.toDate() as Date
            ?? album2?.creationTime
            ?? new Date();
        this.expireTime = (album1?.[AlbumProps.expireTime] as Timestamp)?.toDate() as Date
            ?? album2?.expireTime
            ?? new Date();
        this.tags = album1?.[AlbumProps.tags] as string[]
            ?? album2?.tags ?? [];
        this.thumbnailURL = album1?.[AlbumProps.thumbnailURL] as string
            ?? album2?.thumbnailURL
            ?? '';
        this.imageURLs = album1?.[AlbumProps.imageURLs] as string[]
            ?? album2?.imageURLs
            ?? [];
        this.imageCount = album1?.[AlbumProps.imageCount] as number
            ?? album2?.imageCount
            ?? 0;
        this.viewCount = album1?.[AlbumProps.viewCount] as number
            ?? album2?.viewCount
            ?? 0;
    }
    
    
    
}
