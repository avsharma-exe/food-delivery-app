import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../session.service';


@Injectable({
  providedIn: 'root',
  
})
export class DeliveryExecutiveService {

  constructor(private http: HttpClient, private _sessionService: SessionService) { }
  url = 'http://localhost:3000';
  getOrders(city:String): Observable<any> {

    return this.http.get<any>(this.url + "/orders/"+city);
  }
  getRestaurantById(id: any): Observable<any> {
    return this.http.get<any>(this.url + "/getRestaurantById/" + id);
  }



  acceptOrder(oId: any, otp: number, email: any): Observable<any> {

    let body = {
      "otp": otp,
      "uemail": email
    };
    return this.http.patch<any>(this.url + "/accept-order-de/" + oId, body)
  }

  orderStatus(oId: any, status: string): Observable<any> {
    let body = { 'orderDateAndTime': Date.now(), 'status': status };
    return this.http.patch<any>(this.url + "/order-status/" + oId, body)
  }

  activeOrders(): Observable<any> {

    return this.http.get<any>(this.url + "/active-orders");
  }

  deliveredOrders(): Observable<any> {
    return this.http.get<any>(this.url + "/delivered-orders");
  }

  getRatings(): Observable<any> {
    return this.http.get<any>(this.url + "/getRatings");
  }

  getUserById(): Observable<any> {

    return this.http.get<any>(this.url + "/getUserById");
  }

  getRecent(): Observable<any> {
    return this.http.get<any>(this.url + "/recent-orders");
  }

  sendMail(eid: any, status: any, order: any): Observable<any> {
    let body = order;
    return this.http.post<any>(this.url + "/send-mail/" + eid + "/" + status, body);
  }

  updateDe(data: any): Observable<any> {
    return this.http.put<any>(this.url + "/update-de", data)
  }

  getOrdersByRes(id: any): Observable<any> {
    return this.http.get<any>(this.url + "/get-orders-res/" + id);
  }
}
