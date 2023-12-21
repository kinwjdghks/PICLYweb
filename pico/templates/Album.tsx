
export interface Album_t{
    albumURL : string,
    creationTime : Date,
    expireTime : Date,
    tags : string[],
    imageURLs : string[], //address for images in storage
    viewCount : number,
}

export default class Album{
    private readonly albumURL:string;
    private readonly creationTime: Date;
    private expireTime: Date;
    private tags: string[];
    // private imageURLs: string[];
    private imageURLs: string[]; //for development & test
    private viewCount: number;

    constructor(album:Album_t){
        this.albumURL = album.albumURL;
        this.creationTime = album.creationTime;
        this.expireTime = album.expireTime;
        this.tags = album.tags;
        this.imageURLs = album.imageURLs; //address for images in storage
        this.viewCount = album.viewCount;
    }
    get getAlbumURL():string{
        return this.albumURL;
    }

    get getCreationTime():Date{
        return this.creationTime;
    }

    get getTags(){
        return this.tags;
    }
    
    set editTags(newTags:string[]){
        this.tags = [...newTags];
    }

    set editImageURLs(newURLs: string[]){
        this.imageURLs = [...newURLs];
    }

    get getImageURLs(){
        return this.imageURLs;
    }

    public searchForTag = (input:string):boolean =>{
        for(const tag of this.tags){
            if(tag.includes(input)) return true;
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