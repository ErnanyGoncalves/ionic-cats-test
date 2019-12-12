import { Component, OnInit } from '@angular/core';
import { ImgurApiService } from './imgur-api.service';
import { Subscription } from 'rxjs';
import { Cat } from './cat.model';


@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
})
export class CatsPage implements OnInit {
  private catsSub: Subscription;
  catsList: Cat[] = [];

  isLoading: boolean;

  constructor(private imgurAPI: ImgurApiService ) { }

  currentStyle:string = "only-image";

  ngOnInit() {
    this.catsSub = this.imgurAPI.cats.subscribe(cats => {
      this.catsList = cats;
    });
    this.isLoading = true;
    setTimeout(() => {
      this.imgurAPI.fetchCats().subscribe(() => {
        this.isLoading = false;
      });
    }, 1500);
  }


  setViewStyle(newStyle:string){
    this.currentStyle = newStyle;
  }
  
}
