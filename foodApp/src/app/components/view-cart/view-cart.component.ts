import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { UserService } from 'src/app/utilities/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit, OnDestroy {


  cartItems: Array<any> = [];
  restaurantFoodList: Array<any> = [];
  restaurantId: any = '';
  userObs: any;
  isInOrderBill:boolean=false;
  activityStatus:boolean=false;

  constructor(private _userService: UserService, private _restaurantService: RestaurantService, private route: ActivatedRoute,private router: Router) {

    this.route.url.subscribe((data:any)=>{

      if(data[0].path=='orderBill'){
        this.isInOrderBill=true;
      }
    })

    
  }

  ngOnInit(): void {
   
    this.userObs = this._userService.getUser().subscribe((user) => {
      // if(user?.role!='user')
      //   { 
      //     this.router.navigate(['/']);
      //   }
      if (user?.cart != undefined && user?.cart!=null) {
        
        
      this.restaurantId = user.cart.restaurantId
      this.cartItems = user.cart.foodList;



      this._restaurantService.getRestaurantById(this.restaurantId).then((data) => {
        this.restaurantFoodList = data.menuDetails;      
        let currentTime = new Date();

      if (currentTime.getHours() < data.workingHours.end && currentTime.getHours() >= data.workingHours.start) {
          this.activityStatus=true;
          
      }
        
      });
    }else
    {
      this.cartItems=[];
    }
    
    
    },(err)=>{
   
      
    });

  }
  ngOnDestroy(): void {
    this.userObs.unsubscribe();
  }


  foodItemOfId(id: string): any {
    return this.restaurantFoodList.find((food) => {
      return food._id == id
    });
  }

  getSubTotal(): number {
    let total = 0;
    if(this.cartItems!=undefined && this.restaurantFoodList.length!=0)
    {
      
      this.cartItems.forEach((cartItem: any) => {
        let foodItem = this.foodItemOfId(cartItem.foodId);
        
        total += foodItem.foodPrice * cartItem.quantity;
      })
    }
    return total;
  }

  decrementItem(foodId: String) {
    let foodItem = {
      foodId: foodId,
      restaurantId: this.restaurantId
    }
    this._userService.decrementCartItem(foodItem).subscribe(async (data) => {
      await this._userService.updateUserDataLocal();
    })
  };

  incrementItem(foodId: String) {

    let foodItem = {
      foodId: foodId,
      restaurantId: this.restaurantId
    }
    this._userService.incrementCartItem(foodItem).subscribe(async (data) => {
       this._userService.updateUserDataLocal();
   
    });

  };

  removeItem(foodId:String){
    let foodItem={
      foodId: foodId,
      restaurantId: this.restaurantId
    }
    this._userService.removeItem(foodItem).subscribe(async(data)=>{
      this._userService.updateUserDataLocal();
    })
  }

  clearCart(){
    this._userService.clearCart().subscribe((data)=>{
      this._userService.updateUserDataLocal();
    });
  }

}
