import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Component({
  selector: 'app-top-restaurant-card',
  templateUrl: './top-restaurant-card.component.html',
  styleUrls: ['./top-restaurant-card.component.scss']
})
export class TopRestaurantCardComponent implements OnInit {
 
  @Input() restaurant:Restaurant|undefined;

  constructor() {
    
   }

  ngOnInit(): void {

  }

}
