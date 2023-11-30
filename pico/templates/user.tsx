
class user{
    private readonly userID: string;
    private readonly creationTime: Date;
    private readonly socialID: string;
    private readonly authProvider: string;
    private albumIDs: string[];


   constructor(userID:string, socialID:string, authProvider:string){
        this.userID = userID;
        this.creationTime = new Date();
        this.socialID = socialID;
        this.authProvider = authProvider;
        this.albumIDs = [];
    }



};
