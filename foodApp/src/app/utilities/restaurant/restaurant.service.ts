import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../../interfaces/food';
import { Restaurant } from '../../interfaces/restaurant';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseUrl: string = 'http://localhost:3000/';

  restaurantsData: any;


  constructor(private httpClient: HttpClient, private _sessionService: SessionService) { }


 

  getTopRestaurants(): Observable<Array<Restaurant>> {
 

    return this.httpClient.get<any>(this.baseUrl + 'topRestaurants');
  }

  getTopFoods(): Observable<Array<Food>> {

    return this.httpClient.get<any>(this.baseUrl + 'topFoods');
  }

  acceptOrder(oId: any): Observable<any> {
    let body = {
      oId: oId,
      status: "accepted-ro"
    };
    return this.httpClient.patch<any>(this.baseUrl + "accept-order-ro", body)
  }

  async getRestaurantById(id: any): Promise<any> {
    let restaurant;

    if (this.restaurantsData == undefined) {

      this.restaurantsData = await this.getAllRestaurants().toPromise();

    }

    restaurant = this.restaurantsData.find((restaurant: any) => {
      return restaurant._id == id;
    })


    return restaurant;
  }

  getAllRestaurants(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "getRestaurants");
  }

  getFoodByRestaurant(id: any): Observable<any> {

    let queryParam = new HttpParams({ fromString: "id=" + id });
   

    return this.httpClient.get<any>(this.baseUrl + "getFoodByRestaurant", { params: queryParam });
  }

  searchRestaurants(city: string, searchText: string): Observable<Array<Restaurant>> {
    let queryParam = new HttpParams({ fromString: 'city=' + city + '&search=' + searchText });

    return this.httpClient.get<any>(this.baseUrl + 'searchRestaurants', { params: queryParam });
  }

  getHighlyOrderedRes():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+"highlyOrderedRes");
  }
  
  addRestaurantRating(ratingData:any):Observable<any>{

    return this.httpClient.put<any>(this.baseUrl+"addRestaurantRating",ratingData)
  }

}
