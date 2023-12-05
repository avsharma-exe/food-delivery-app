import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeliveryExecutiveService } from 'src/app/utilities/delivery-executive/delivery-executive.service';
import { SessionService } from 'src/app/utilities/session.service';
import { UserService } from 'src/app/utilities/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('dataUpdated')
  private dataUpdated!: TemplateRef<any>;

  hide = true;
  profileForm: any;
  avgRating: number = 0;
  userRole : any;
  usrgender:any
  userprofileForm: any;
  constructor(private dialog:MatDialog,private _ordersServ: DeliveryExecutiveService,private _userService: UserService) {}
  userdata:any
  userName:any
  postDeData:any
  postUserData:any;
  RatingsObj:any;
  deRatings:any;
  ngOnInit(): void {

    this._userService.getUser().subscribe(res  =>{
      // if(!this._sessionService.checkSession()||res?.role=='ro')
      //   {
      //     this.router.navigateByUrl('/');
      //   }
      if(res!=null)
      {
        this.userdata = res;
        this.userRole = res.role;
        this.usrgender = res.gender;

        if(this.userRole == "de"){
          this.form();
          this.Ratings();
        }
        if(this.userRole == "user"){
          this.userForm();
        }

      }
    });
  }

  // Calculate Average Ratings From Ratings Object
  Ratings(){
      this.RatingsObj= this.userdata.deliveryExecutive.deliveryExecutiveRatings;
      const arrayLength:any = this.RatingsObj.length ;
      this.RatingsObj.forEach((element:any) => {
      this.avgRating  = this.avgRating + element.rating;


    });

      this.deRatings = (this.avgRating)/arrayLength
      this.deRatings = this.deRatings.toFixed(1)
  }

  // Get Profile Data from DE
  sendDeProfile():void{
    this.postDeData = this.profileForm.value;
    let dataDe = {
      firstName:this.postDeData.firstName,
      lastName:this.postDeData.lastName,
      email:this.postDeData.email,
      mobileNumber:this.postDeData.mobileNumber,
        $set:{
            "deliveryExecutive.vehicleNumber" : this.postDeData.vehicleNumber,
            "deliveryExecutive.deliveryExecutiveLocation.streetAddress" : this.postDeData.streetAddress,
            "deliveryExecutive.deliveryExecutiveLocation.city" : this.postDeData.city,
            "deliveryExecutive.deliveryExecutiveLocation.state" : this.postDeData.state,
            "deliveryExecutive.deliveryExecutiveLocation.country" : this.postDeData.country,
            "deliveryExecutive.deliveryExecutiveLocation.zip" : this.postDeData.pincode,
            "deliveryExecutive.deliveryExecutiveLocation.landmark" : this.postDeData.landmark,
            "deliveryExecutive.deliveryExecutiveLocation.area" : this.postDeData.area
        }
    }

    this._ordersServ.updateDe( dataDe ).subscribe(res => {
    this.dialog.open(this.dataUpdated);
    this._userService.updateUserDataLocal();

    });
  }

  sendUserProfile(){
    this.postUserData = this.userprofileForm.value;
    let dataDe = {
      firstName:this.postUserData.firstNameUser,
      lastName:this.postUserData.lastNameUser,
      email:this.postUserData.emailUser,
      mobileNumber:this.postUserData.mobileNumberUser,
    }
    this._ordersServ.updateDe( dataDe ).subscribe(res => {
    this.dialog.open(this.dataUpdated);
    this._userService.updateUserDataLocal();
    });
  }

  form(){
    this.profileForm = new FormGroup({
        firstName: new FormControl(this.userdata.firstName,Validators.required),
        lastName: new FormControl(this.userdata.lastName,Validators.required),
        email:new FormControl(this.userdata.email,[Validators.required, Validators.email]),
        mobileNumber: new FormControl(this.userdata.mobileNumber,[Validators
          .required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        vehicleNumber:new FormControl(this.userdata.deliveryExecutive.vehicleNumber,
          Validators.required),
        streetAddress:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation
          .streetAddress,Validators.required),
        city:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.city,
          Validators.required),
        pincode:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.zip,
          [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]),
        state:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.state,
          Validators.required),
        country:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.country,
          Validators.required),
        landmark:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.
          landmark,Validators.required),
        area:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.
          area,Validators.required),
    });

  }
  userForm(){
    this.userprofileForm = new FormGroup({
      firstNameUser: new FormControl(this.userdata.firstName,Validators.required),
      lastNameUser: new FormControl(this.userdata.lastName,Validators.required),
      emailUser:new FormControl(this.userdata.email,[Validators.required, Validators.email]),
      mobileNumberUser: new FormControl(this.userdata.mobileNumber,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    });
  }

  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get mobileNumber() { return this.profileForm.get('mobileNumber'); }
  get vehicleNumber() { return this.profileForm.get('vehicleNumber'); }
  get streetAddress() { return this.profileForm.get('streetAddress'); }
  get city() { return this.profileForm.get('city'); }
  get pincode() { return this.profileForm.get('pincode'); }
  get state() { return this.profileForm.get('state'); }


  get firstNameUser() { return this.userprofileForm.get('firstNameUser'); }
  get lastNameUser() { return this.userprofileForm.get('lastNameUser'); }
  get emailUser() { return this.userprofileForm.get('emailUser'); }
  get mobileNumberUser() { return this.userprofileForm.get('mobileNumberUser'); }
}
