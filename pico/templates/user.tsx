
export class user{
    private socialID: string;
    private authProvider: string;
    private creationTime: Date;
    private albumIDs: string[];


   constructor(socialID:string, authProvider:string){
        this.creationTime = new Date();
        this.socialID = socialID;
        this.authProvider = authProvider;
        this.albumIDs = [];
    }


};
