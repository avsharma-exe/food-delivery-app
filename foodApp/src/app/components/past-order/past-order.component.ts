import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/utilities/order.service';
import { AddRatingDialogComponent } from '../add-rating-dialog/add-rating-dialog.component';

@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.scss']
})
export class PastOrderComponent implements OnInit {


  @Input()
  order: any;

  rating: number = 0;

  constructor(private _orderService:OrderService, private dialog :MatDialog ) { }



  ngOnInit(): void {
    
  }

  addFoodRating(restaurantId: string, foodList: any) {
    const dialogRef = this.dialog.open(AddRatingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      
      if (result != undefined && result != null && result!="") {

        this.rating = result;
        let ratingData = {
          restaurantId: restaurantId,
          foodList: foodList,
          rating: this.rating
        }

        this._orderService.addFoodRating(ratingData).subscribe((data) => {
            this.order.isFoodRated=true;
            this.changeRatingStatus();
        })

      }

    });
  }
  addDeliveryRating(deId: string) {
    const dialogRef = this.dialog.open(AddRatingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null && result!="") {

        this.rating = result;
        let ratingData = {
          deId: deId,
          rating: this.rating
        }

        this._orderService.addDeRating(ratingData).subscribe((data) => {
          this.order.isDeRated=true;
          this.changeRatingStatus();
        })
      }
    });
  }

  changeRatingStatus(){
    let ratingStatus={
      orderId:this.order._id,
      isDeRated:this.order.isDeRated,
      isFoodRated:this.order.isFoodRated
    }
    this._orderService.orderRatingStatus(ratingStatus).subscribe((data)=>{
    });
  }

}
