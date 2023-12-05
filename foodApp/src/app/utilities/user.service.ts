import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:3000/";  
  userOb:BehaviorSubject<any>=new BehaviorSubject(null);
  userData: any ;
  constructor(private http: HttpClient, private _sessionService: SessionService) {
  }

   getUser():Observable<any>{
    if(this.userData==undefined)
    {
      this.updateUserDataLocal();
    }
        return this.userOb.asObservable();
  }

  resetLocalData(){
    
    this.userOb.next(undefined);
    this._sessionService.clearSession();
  }

  getHeader():HttpHeaders{
    let token = this._sessionService.getJWTToken();
    let bearer = `Bearer ${token}`;
    
    
    let headers = new HttpHeaders().set("Authorization",bearer );
    return headers;
  }

  getUserById(): Observable<any> {
 

    return this.http.get<any>(this.baseUrl + "getUserById", { headers: this.getHeader() });
    // return this.http.get<any>(this.baseUrl + "getUserById");
  }

  updateUserDataLocal() {
    if (this._sessionService.checkSession()) {
      this.getUserById().subscribe((data) => {
          
        this.userData = data.user;
        this.userOb.next(this.userData);
      });
    }
  }
 

  incrementCartItem(foodItem: any): Observable<any> {
    
    return this.http.put<any>(this.baseUrl + 'addToCart', foodItem, { headers: this.getHeader() });
    // return this.http.put<any>(this.baseUrl + 'addToCart', foodItem);
  }

  
  
  userLogin(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', user);
  }

  sendOtpForResetPassword(email:any):Observable<any>{
    let body={
      email: email
    }
    return this.http.post<any>(this.baseUrl+'sendOtpForResetPassword',body);
  }

  resetPassword(newData:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+'resetPassword',newData);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addUser', userData);
  }

  decrementCartItem(foodItem:any):Observable<any>{
   
    
    return this.http.put<any>(this.baseUrl+'reduceCartItem',foodItem,{headers:this.getHeader()});
    // return this.http.put<any>(this.baseUrl+'reduceCartItem',foodItem);
  }

  removeItem(foodItem:any):Observable<any>{

    
    return this.http.put<any>(this.baseUrl+'removeItem',foodItem,{headers:this.getHeader()});
    // return this.http.put<any>(this.baseUrl+'removeItem',foodItem);
  }

  clearCart():Observable<any>{
   
    return this.http.put<any>(this.baseUrl+'clearCart',null,{headers:this.getHeader()});
    // return this.http.put<any>(this.baseUrl+'clearCart',null);
  }
  
  
  

}
