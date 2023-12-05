import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = 'http://localhost:3000/';


  constructor(private httpClient:HttpClient) { }

  getCategoryList():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+'getCategories');
  }
}
