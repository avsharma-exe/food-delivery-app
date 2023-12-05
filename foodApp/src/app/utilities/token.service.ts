import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SessionService } from './session.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(private _sessionService: SessionService,private _userService:UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this._sessionService.getJWTToken();
    let bearer = `Bearer ${token}`;

    if (req.url.includes('localhost:3000') && token != undefined) {
      let reqobj = req.clone({ setHeaders: { 'Authorization': bearer } });
      return next.handle(reqobj).pipe(retry(1), catchError(this.handleErr));
    }
    else {
      return next.handle(req);
    }

  }

  handleErr=(err:HttpErrorResponse)=>{
    if(err.error.message=='Unauthorized Request'){
      
      this._userService.resetLocalData();
    }
    return throwError('sjdflsjfld');
  }

}
