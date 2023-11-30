
export default class Album{
    private readonly albumID: string;
    private readonly creationTime: Date;
    private expireTime: Date;
    private tags: string[];
    private imageURLs: string[];
    private viewCount: number;

    constructor(albumID:string, expireTime:Date){
        this.albumID = albumID;
        this.creationTime = new Date();
        this.expireTime = expireTime;
        this.tags =[];
        this.imageURLs = []; //address for images in storage
        this.viewCount = 0;
    }

    get getAlbumID():string{
        return this.albumID;
    }

    set editTags(newTags:string[]){
        this.tags = [...newTags];
    }

    set editImageURLs(newURLs: string[]){
        this.imageURLs = [...newURLs];
    }

    public searchForTag = (input:string):boolean =>{
        for(const tag of this.tags){
            if(tag == input) return true;
        }
        return false;
    }
    set editExpireTime(newDate:Date){
        this.expireTime = newDate;
    }
    get getExpireTime():Date{
        return this.expireTime;
    }

    public view = ():void =>{
        ++this.viewCount;
    }

    get getViewCount():number{
        return this.viewCount;
    }

}