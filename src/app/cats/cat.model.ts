export class Cat {
    public title: string;
    public datetime: string;
    public userUrl: string;
    public user: string;
    public ups: number;
    public downs: number;
    public views: number;
    public postLink: string;
    public imageUrl: string;

    constructor(title: string,
        datetime: string,
        userUrl: string,
        user: string,
        ups: number,
        downs: number,
        views: number,
        postLink: string,
        imageUrl: string) {
            this.title = title;
            this.datetime = datetime;
            this.userUrl = userUrl;
            this.user = user;
            this.ups = ups;
            this.downs = downs;
            this.views = views;
            this.postLink = postLink;
            this.imageUrl = imageUrl;
    }
}