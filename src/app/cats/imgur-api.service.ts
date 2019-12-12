import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Cat } from './cat.model';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImgurApiService {

  private _cats = new BehaviorSubject<Cat[]>([]);

  constructor(private httpClient: HttpClient) { }
  url: string = "https://api.imgur.com/3/gallery/search?q=title:cats";
  clientID: string = "1ceddedc03a5d71";

  get cats() {
    return this._cats.asObservable();
  }

  fetchCats() {
    const headers = new HttpHeaders('Authorization: Client-ID ' + this.clientID);
    return this.httpClient.get(this.url, { headers: headers }).pipe(map(resData => {
      const cats = [];
      for (let c = 0; c < resData["data"].length; c++) {
        if (resData["data"][c].images[0].type !== "video/mp4") {
          let date = new Date(resData["data"][c].datetime * 1000);
          cats.push(
            new Cat(
              resData["data"][c].title,
              `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} (BRT) ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
              `https://imgur.com/user/${resData["data"][c]["account_url"]}`,
              resData["data"][c]["account_url"],
              resData["data"][c].ups,
              resData["data"][c].downs,
              resData["data"][c].views,
              resData["data"][c]["link"],
              resData["data"][c]["images"][0].link)
          );
        }
      }
      return cats;
    }), tap(cats => {
      this._cats.next(cats);
    }));
  }
}
