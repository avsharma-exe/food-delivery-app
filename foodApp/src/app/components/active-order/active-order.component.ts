import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.scss']
})
export class ActiveOrderComponent implements OnInit, AfterViewInit {


  @ViewChild('stepper',{})
  private myStepper: MatStepper | undefined;



  constructor() { }

  @Input()
  order: any;

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    if (this.myStepper != undefined) {
      
      
      if (this.order.orderStatus == 'accepted-ro || ordered') {
        this.myStepper.next();

      }
      else if (this.order.orderStatus == 'accepted-de') {
        this.myStepper.next();
        this.myStepper.next();
        
      }


      if (this.order.orderStatus == 'Picked-up') {
        this.myStepper.next();
        this.myStepper.next();
        this.myStepper.next();
      }

      if (this.order.orderStatus == 'On-the-Way') {
        this.myStepper.next();
        this.myStepper.next();
        this.myStepper.next();
        this.myStepper.next();
      }
    }
  }

}


