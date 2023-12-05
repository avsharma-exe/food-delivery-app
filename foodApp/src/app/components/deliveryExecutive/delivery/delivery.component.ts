import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeliveryExecutiveService } from 'src/app/utilities/delivery-executive/delivery-executive.service';
import { SessionService } from 'src/app/utilities/session.service';
import { UserService } from 'src/app/utilities/user.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, OnDestroy {
  @ViewChild('orderLimit')
  private orderLimit!: TemplateRef<any>;

  @ViewChild('success')
  private success!: TemplateRef<any>;

  @ViewChild('otp')
  private otp!: TemplateRef<any>;

  @ViewChild('error')
  private error!: TemplateRef<any>;

  activeOrders: any = [];
  statusForm = this.formBuilder.group({
    selected: ['', Validators.required],
  });
  recentOrders: any = [];
  deCity: String = "";
  delivery:any;
  deName:any;
  id:any;
  orderOtp:any;
  email:any;
  orderData:any;

  constructor(private _ordersServ: DeliveryExecutiveService,
    private _userService: UserService, private formBuilder: FormBuilder,public dialog: MatDialog) { }
  ngOnDestroy(): void {
    clearInterval(this.delivery);
  }
  orders: any = [];
  ngOnInit(): void {
    this._userService.getUser().subscribe((data) => {

      

      if (data != undefined && data.role == 'de') {
        this.deCity = data.deliveryExecutive.deliveryExecutiveLocation.city;
        this.deName = data.firstName;
        this._ordersServ.activeOrders().subscribe(res => {
          this.Acount = res.orders.length;
          this.activeOrders = res.orders;

        });
        this._ordersServ.getOrders(this.deCity).subscribe(res => {
          this.Ocount = res.orders.length;
          this.orders = res.orders;
        });
        this._ordersServ.getRecent().subscribe(res => {
          this.recentOrders = res.orders;
        });
        this.delivery = setInterval(() => { this.gOrders(); }, 2000);
      }
    });

  }
  Acount = 0;
  Ocount = 0;
  gOrders(): void {
    this._ordersServ.getOrders(this.deCity).subscribe(res => {

        this.orders = res.orders


    });
    this._ordersServ.activeOrders().subscribe(res => {
      if (res.orders.length != this.Acount) {
        this.Acount = res.orders.length;
        this.activeOrders = res.orders;
      }
    });

  }

  acceptOrder(value: any, email: any): void {
    if (this.Acount < 3) {
      let val = Math.floor(1000 + Math.random() * 9000);
      this._ordersServ.acceptOrder(value, val, email).subscribe(res => {
      })

    } else {
      this.dialog.open(this.orderLimit);
    }
  }



  change(id: any, email: any, restaurantName: string, total: number, otp: number) {
    let status = '';
    status = this.statusForm.value.selected;
    let data = {
      restaurantName: restaurantName,
      billAmount: total
    }

    if (status === 'delivered') {
      // console.log(otp);
      this.id = id;
      this.email = email;
      this.orderOtp =otp;
      this.orderData = data;
      this.dialog.open(this.otp);

    } else if (status === 'pickedup') {
      this._ordersServ.sendMail(email, "Picked-up", data).subscribe(res => {
      })
      this._ordersServ.orderStatus(id, "Picked-up").subscribe(res => {
      })

    } else if (status === 'ontheway') {
      this._ordersServ.sendMail(email, "On-the-Way", data).subscribe(res => {
      })
      this._ordersServ.orderStatus(id, "On-the-Way").subscribe(res => {
      })
    }

  }
  onOtpChange(val:any){
    // console.log(this.orderOtp)
    if(val>999){
      if (val == this.orderOtp) {
        this._ordersServ.orderStatus(this.id, "delivered").subscribe(res => {
        })
        this._ordersServ.sendMail(this.email, "delivered", this.orderData).subscribe(res => {
        })
        this.dialog.open(this.success);
        setTimeout(()=>{this.dialog.closeAll();},1000);
      } else {
        this.dialog.open(this.error);
      }
    }
    }
}
