import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-food-card',
  templateUrl: './top-food-card.component.html',
  styleUrls: ['./top-food-card.component.scss']
})
export class TopFoodCardComponent implements OnInit {

  @Input() foodItem:any;
  type='non veg';

  constructor() { }

  ngOnInit(): void {
    
  }

}
