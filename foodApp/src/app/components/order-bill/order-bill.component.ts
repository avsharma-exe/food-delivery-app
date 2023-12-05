import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { UserService } from 'src/app/utilities/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogueComponent } from '../address-dialogue/address-dialogue.component';
import { OrderService } from 'src/app/utilities/order.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/utilities/session.service';

@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.scss']
})
export class OrderBillComponent implements OnInit {

  restaurantData: any
  restaurantId: String = "";
  userCart: any;
  userObs;
  activityStatus: boolean = false;

  addressData = {
    streetAddress: "",
    landmark: "",
    area: "",
    zip: null,
    city: "",
    state: "",
    country: ""
  };

  @Input()
  isInOrderBill: boolean = true;


  constructor(private _userService: UserService, private _restaurantService: RestaurantService, private _orderService: OrderService, public dialog: MatDialog, private router: Router) {
    this.userObs = this._userService.getUser().subscribe((user) => {
      // if(!this._sessionService.checkSession() || user?.role!='user')
      // {
      //   router.navigateByUrl('/');
      // }
      if (user?.cart != undefined && user?.cart != null) {


        this.restaurantId = user.cart.restaurantId
        this.userCart = user.cart.foodList;



        this._restaurantService.getRestaurantById(this.restaurantId).then((data) => {
          if (data != undefined && data != null) {
            this.restaurantData = data;
            this.addressData.city = this.restaurantData.restaurantLocation.city;
            this.addressData.state = this.restaurantData.restaurantLocation.state;
            this.addressData.country = this.restaurantData.restaurantLocation.country;

            let currentTime = new Date();

            if (currentTime.getHours() < this.restaurantData?.workingHours.end && currentTime.getHours() >= this.restaurantData?.workingHours.start) {
              this.activityStatus = true;
            }
          }


        });
      } else {
        this.userCart = [];
      }
    });
  }

  ngOnInit(): void {

  }



  foodItemOfId(id: string): any {
    return this.restaurantData.menuDetails.find((food: any) => {
      return food._id == id
    });
  }

  getSubTotal(): number {
    let total = 0;
    if (this.userCart != undefined && this.restaurantData?.menuDetails.length != 0) {

      this.userCart.forEach((cartItem: any) => {
        let foodItem = this.foodItemOfId(cartItem.foodId);

        total += foodItem.foodPrice * cartItem.quantity;
      })
    }
    return total;
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddressDialogueComponent, {
      data: { addressData: this.addressData },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.addressData = result;
      }
    });
  }

  placeOrder() {
    this._orderService.addOrder(this.addressData).subscribe((data) => {

      if (data.message != undefined && data.message == "Restaurant is closed right now") {
        alert(data.message);
      }
      else {
        this._userService.clearCart().subscribe((data) => {
          this._userService.updateUserDataLocal();
          this.router.navigate(['/userOrders'])
        },
          (err) => {

          });
        this._orderService.updateUserOrderDataLocal();
      }
    },
      (err) => {

      });
  }
}
