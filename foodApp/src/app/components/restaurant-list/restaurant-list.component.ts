import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Array<Restaurant>;
  selectedFilters: Array<string> = [];
  selectedCity: string = '';
  searchText: string = '';
  topRatedCheck: boolean = false;
  restaurantSubscription?: Subscription;

  constructor(private filter_dialog: MatDialog, private _restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private _snackbar: MatSnackBar) {
    this.restaurants = [];
    let category = activatedRoute.snapshot.queryParams.category;
    (activatedRoute.snapshot.queryParams);

    if (category != undefined) {
      this.searchText = category;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getLocation(position.coords.latitude, position.coords.longitude).subscribe((data) => {
          let t=data.results[0].address_components.find((item:any)=>{
          return item.types.includes('administrative_area_level_2');
          });
          
          this.selectedCity =t.long_name;
        })
      },
      (error) => {
        // alert("The Locator was denied, Please add your address manually");
        this._snackbar.open("The Locator was denied, Please select your city manually", "", {
          duration: 3000,
        });
      }
    );

  }

  getLocation(lat: any, long: any): Observable<any> {
    // return this.httpClient.get<any>("https://maps.googleapis.com/maps/api/geocode/json?latlng=17.3850,78.4867&key=AIzaSyCtbqQRXewTbMlXM5h_LD6bxw0lz2WmrcU");
    return this.httpClient.get<any>("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key="+environment.googleApi);
  }


  ngOnInit(): void {

    this.searchR();
  }

  onSearchChange(event: string) {
    this.searchText = event;
    this.searchR();
  }

  onCitySelect(event: string) {
    this.selectedCity = event;
    this.searchR();
  }

  searchR() {

    if (this.restaurantSubscription != undefined) {
      this.restaurantSubscription.unsubscribe();
    }
    this.restaurantSubscription = this._restaurantService.searchRestaurants(this.selectedCity, this.searchText).subscribe((data) => {
      this.restaurants = data;


    },
      (err) => {
      }
    )


  }


  openDialog() {
    let filterDialog = this.filter_dialog.open(FilterDialogComponent, {
      width: '60vw',
      maxWidth: '1200px',
      height: '50vh',
      minHeight: 'max-content',
      maxHeight: '100%',
      hasBackdrop: true,
      data: this.selectedFilters
    });
    filterDialog.afterOpened().subscribe((result) => {

      if (result != undefined) {
      }
    })

  }

}
