import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { SessionService } from 'src/app/utilities/session.service';
import { UserService } from 'src/app/utilities/user.service';
import { AddRatingDialogComponent } from '../add-rating-dialog/add-rating-dialog.component';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss'],

})
export class RestaurantHomeComponent implements OnInit, OnDestroy {

  restaurantData: any;
  foodData: any;
  restaurantId: string = "";
  userData: any = "";
  userObs;
  pureVegChecked: boolean = false;
  activityStatus: boolean = false;

  constructor(private routes: ActivatedRoute, private _restaurantService: RestaurantService, private _userService: UserService, private _sessionService: SessionService, public dialog: MatDialog, private _snackbar: MatSnackBar) {
    routes.params.subscribe((param) => {
      this.restaurantId = param['id'];
    });
    this.userObs = this._userService.getUser().subscribe((user) => {

      this.userData = user;
      // if (this._sessionService.checkSession() ) {
      //   if (this.userData?.role == 'de' )
      //   {
      //      router.navigateByUrl('/de-dashboard');

      //   }
      //   else if( this.userData?.role == 'ro'){

      //     router.navigateByUrl('/ro-home');
      //   }
      // }
    });

    this._restaurantService.getRestaurantById(this.restaurantId).then((data) => {
      this.restaurantData = data;
      let currentTime = new Date();

      if (currentTime.getHours() < this.restaurantData.workingHours.end && currentTime.getHours() >= this.restaurantData.workingHours.start) {
          this.activityStatus=true;
      }
    });
  }


  ngOnInit(): void {

    this._restaurantService.getFoodByRestaurant(this.restaurantId).subscribe(res => {
      if (res != undefined) {
        this.foodData = res;
        // console.log(this.foodData);
      }
    });

  }
  ngOnDestroy(): void {
    this.userObs.unsubscribe();
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  getPopularDishes(): string[] {
    let data: string[] = [];
    if (this.foodData != undefined) {
      this.foodData.forEach((element: any) => {
        data.push(element.food.foodName);
      });
    }
    data = data.filter((data, idx) => idx < 4);

    return data;
  }

  addRating() {
    if (this._sessionService.checkSession()) {
      const dialogRef = this.dialog.open(AddRatingDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined && result != null) {

          let ratingData = {
            restaurantRating: result,
            restaurantId: this.restaurantData._id
          }

          this._restaurantService.addRestaurantRating(ratingData).subscribe((data) => {

            this._restaurantService.getRestaurantById(this.restaurantId).then((rsdata) => {

              this.restaurantData = rsdata;
            });
          });
        }

      });

    }
    else {
      this.openDialogLogin();
    }

  }
  openDialogLogin() {
    let loginPopup = this._snackbar.open("Please login to Rate restaurant", 'Login Here.', {
      duration: 3000,
    });
    loginPopup.onAction().subscribe(() => {

      this.dialog.open(LoginComponent);
    })
  }

  searchCousine(category:string){
    
  }

}
