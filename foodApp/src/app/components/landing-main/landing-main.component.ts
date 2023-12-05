import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from 'src/app/interfaces/food';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';


@Component({
  selector: 'app-landing-main',
  templateUrl: './landing-main.component.html',
  styleUrls: ['./landing-main.component.scss']
})
export class LandingMainComponent implements OnInit {
  topRestaurants: Array<Restaurant>;
  topFoods: Array<Food>;

  topRestaurantSlides: any = [[]];
  columnlength: string = 'col-3';
  chunk(arr:Array<any>, chunkSize:number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setSlide( event.target.innerWidth);
  }

  setSlide(myWidth: number) {
    if (myWidth <= 768) {
      this.columnlength = 'col-12';
      this.topRestaurantSlides = this.chunk(this.topRestaurants, 1);
    } else if (myWidth <= 1200) {
      this.columnlength = 'col-6';
      this.topRestaurantSlides = this.chunk(this.topRestaurants, 2);
    } else {
      this.columnlength = 'col-4';
      this.topRestaurantSlides = this.chunk(this.topRestaurants, 3);
    }
  }

  constructor(private _restaurantService: RestaurantService) {
    this.topRestaurants = []
    this.topFoods = []
  }

  ngOnInit(): void {
    this._restaurantService.getTopRestaurants().subscribe((data) => {
      if (data != undefined) {
        this.topRestaurants = data;
        this.setSlide(window.innerWidth);
      }
    });
    this._restaurantService.getTopFoods().subscribe(data => {

      if (data != undefined) {
        this.topFoods = data.slice(0, 7);
      }
    })

  }

}
