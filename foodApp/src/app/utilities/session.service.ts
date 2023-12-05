import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getJWTToken(){
    let token = localStorage.getItem('token');
    if(token!=null)
    {
      return token;
    }
    else{
      return undefined;
    }
  }
  setLocalSession(token:string){
    localStorage.setItem('token',token);
  }

  checkSession():boolean{
    return localStorage.getItem('token')!=null;
  }

 

  clearSession(){
    localStorage.clear();
  }
}
