import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ViewChild } from '@angular/core';
import { OrderService } from 'src/app/utilities/order.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/utilities/session.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class UserOrdersComponent implements OnInit {


  @ViewChild('stepper')



  restaurantData: any;
  orders: any;
  pastOrders: Array<any> = [];
  currentOrders: Array<any> = [];
  rating: number = 0;

  selectedIndex: number = 0;

  constructor(  private _orderService: OrderService, private _sessionService: SessionService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // this._userService.getUser().subscribe((data) => {
    //   if (!this._sessionService.checkSession() || data?.role != 'user') {
    //     this.router.navigateByUrl('/');
    //   }
    // })

    this._orderService.getUserOrders().subscribe((data) => {

      this.orders = data;


      if (this.orders != undefined) {
        this.pastOrders = this.orders.filter((order: any) => { return order.orderStatus == 'delivered' });
        this.pastOrders.reverse();

        this.currentOrders = this.orders.filter((order: any) => { return order.orderStatus != 'delivered' });
        this.currentOrders.reverse();
      }



    })
  }

 

  refreshOrders() {
    this._orderService.updateUserOrderDataLocal();
  }
}
