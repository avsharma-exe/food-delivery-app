import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryReportsComponent } from './components/deliveryExecutive/delivery-reports/delivery-reports.component';
import { DeliveryComponent } from './components/deliveryExecutive/delivery/delivery.component';
import { LandingMainComponent } from './components/landing-main/landing-main.component';
import { RestaurentOwnerHomeComponent } from './components/restaurent-owner-home/restaurent-owner-home.component';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { OrderBillComponent } from './components/order-bill/order-bill.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReportsComponent } from './components/user-reports/user-reports.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './utilities/auth-guard.service';

const routes: Routes = [

  {
    path: '', component: LandingMainComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user','']
    }
  },
  {
    path: 'restaurants', component: RestaurantListComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user','']
    }
  },
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['de','user']
    }
  },
  {
    path: 'ro-home', component: RestaurentOwnerHomeComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['ro']
    }
  },
  {
    path: 'de-reports', component: DeliveryReportsComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['de']
    }
  },
  {
    path: 'de-dashboard', component: DeliveryComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['de']
    }
  },
  {
    path: 'orderBill', component: OrderBillComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user']
    }
  },
  {
    path: 'userOrders', component: UserOrdersComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user']
    }
  },
  {
    path: 'restaurant/:id', component: RestaurantHomeComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user','']
    }
  },
  {
    path: 'user-reports', component: UserReportsComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user']
    }
  },
  {
    path: 'usercart', component: ViewCartComponent, canActivate: [AuthGuardService], data: {
      expectedRoles: ['user']
    }
  },
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled',onSameUrlNavigation:'ignore' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
