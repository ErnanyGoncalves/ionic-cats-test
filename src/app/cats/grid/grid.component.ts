import { Component, OnInit, Input } from '@angular/core';
import { ImgurApiService } from '../imgur-api.service';
import { Cat } from '../cat.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {

  @Input() apiRes: Cat[];
  @Input() currentViewStyle: string;

  catsImageList: Cat[] = [];
  currentPosition: number = 0;
  catsPerRoll: number = 10;
  apiResSize: number;


  constructor( private iab: InAppBrowser, private imgurAPI: ImgurApiService) { }

  ngOnInit() {
    this.apiResSize = this.apiRes.length;
    this.appendCats(this.currentPosition, this.catsPerRoll, this.apiRes);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.appendCats(this.currentPosition, this.catsPerRoll, this.apiRes);
      if (this.catsImageList.length == this.apiResSize) {
        console.log('Done, no more data!');
        event.target.disabled = true;
      }
    }, 1000);
  }

  appendCats(start: number, newCats: number, catsArray: Cat[]) {
    for (let c = start; c < newCats; c++) {
      this.catsImageList.push(catsArray[c]);
    }
    this.currentPosition = this.catsPerRoll;
    this.catsPerRoll += this.catsPerRoll + 10 > this.apiResSize ? this.apiResSize - this.currentPosition : 10;
  }


  openBrowser(link: string) {
    this.iab.create(link, "_system");
  }

}
