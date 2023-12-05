import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  userObj: any;
  constructor(private _userService: UserService, private _sessionService: SessionService, private router: Router) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let expectedRoles = route.data.expectedRoles;
    
    if (this._sessionService.checkSession()) {

      this.userObj = await this._userService.getUserById().toPromise().catch((reason:any)=>{
        
      });
      
      this.userObj = this.userObj?.user;
      
      if (this.userObj != undefined && this.userObj != null) {

        if (expectedRoles.includes(this.userObj.role)) {
          return true;
        }
        else if (this.userObj.role == 'ro') {
          this.router.navigate(['/ro-home']);
          return false;
        }
        else if (this.userObj.role == 'de') {
          this.router.navigate(['/de-dashboard']);
          return false;
        }
      }
    }
    if (expectedRoles.includes('')) {
      
      return true;
    }
    this.router.navigate(['/'])
    return false;

  }





}
