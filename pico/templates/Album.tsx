import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";

export type imageSize  = {width:number, height:number};
export type imageDetail = {file:File}&imageSize;

export enum AlbumProps {
  albumID = "albumID",
  ownerID = "ownerID",
  creationTime = "creationTime",
  expireTime = "expireTime",
  tags = "tags",
  thumbnailURL = "thumbnailURL",
  imageURLs = "imageURLs",
  imageCount = "imageCount",
  viewCount = "viewCount",
  imageSizes = "imageSizes",
}

export interface Album {
  albumID: string;
  ownerID: string;
  creationTime: Date;
  expireTime: Date;
  tags: string[];
  thumbnailURL?: string;
  imageURLs: string[];
  imageCount: number;
  viewCount: number;
  imageSizes: imageSize[];
}

export type AlbumData =
  | DocumentSnapshot<DocumentData, DocumentData>
  | DocumentData
  | Album;

export class Album {
  public albumID: string;
  public ownerID: string;
  public creationTime: Date;
  public expireTime: Date;
  public tags: string[];
  public thumbnailURL?: string;
  public imageURLs: string[];
  public imageCount: number;
  public viewCount: number;
  public imageSizes: imageSize[];

  constructor(album: AlbumData) {
    if (album instanceof DocumentSnapshot) {
      // Handle DocumentSnapshot
      this.albumID = album.get(AlbumProps.albumID) ?? "";
      this.ownerID = album.get(AlbumProps.ownerID) ?? "";
      this.creationTime = (album.get(AlbumProps.creationTime) as Timestamp)?.toDate() ?? new Date();
      this.expireTime = (album.get(AlbumProps.expireTime) as Timestamp)?.toDate() ?? new Date();
      this.tags = album.get(AlbumProps.tags) ?? [];
      this.thumbnailURL = album.get(AlbumProps.thumbnailURL) ?? "";
      this.imageURLs = album.get(AlbumProps.imageURLs) ?? [];
      this.imageCount = album.get(AlbumProps.imageCount) ?? 0;
      this.viewCount = album.get(AlbumProps.viewCount) ?? 0;
      this.imageSizes = album.get(AlbumProps.imageSizes) ?? [];
    } else if (album.creationTime instanceof Date) { // This is a simplistic check to determine if it's an Album type
      // Handle Album
      this.albumID = album.albumID;
      this.ownerID = album.ownerID;
      this.creationTime = album.creationTime;
      this.expireTime = album.expireTime;
      this.tags = album.tags;
      this.thumbnailURL = album.thumbnailURL;
      this.imageURLs = album.imageURLs;
      this.imageCount = album.imageCount;
      this.viewCount = album.viewCount;
      this.imageSizes = album.imageSizes;
    } else {
      this.albumID = album.albumID ?? '';
      this.ownerID = album.ownerID ?? '';
      this.creationTime = album.creationTime.toDate() ?? new Date();
      this.expireTime = album.expireTime.toDate() ?? new Date();
      this.tags = album.tags ?? [];
      this.thumbnailURL = album.thumbnailURL ?? '';
      this.imageURLs = album.imageURLs ?? [];
      this.imageCount = album.imageCount ?? 0;
      this.viewCount = album.viewCount ?? 0;
      this.imageSizes = album.imageSizes ?? [];
    }
  }
}
