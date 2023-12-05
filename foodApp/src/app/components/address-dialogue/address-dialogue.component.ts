import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-dialogue',
  templateUrl: './address-dialogue.component.html',
  styleUrls: ['./address-dialogue.component.scss']
})
export class AddressDialogueComponent implements OnInit {

  addressForm: any;
  zipRegx = ("^((\\+91-?)|0)?[0-9]{6}$")
  addressData: any;
  isFormValid: boolean = false;


  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddressDialogueComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addressData = data.addressData;
  }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      streetAddress: [this.addressData.streetAddress, Validators.required],
      landmark: [this.addressData.landmark],
      city: [this.addressData.city, Validators.required],
      area: [this.addressData.area, Validators.required],
      zip: [this.addressData.zip, [Validators.required, Validators.pattern(this.zipRegx)]],
    });
  }

  submitAddress() {

    if (this.addressForm.valid) {
      this.addressData = {
        streetAddress: this.addressForm.value.streetAddress,
        landmark: this.addressForm.value.landmark,
        city: this.addressForm.value.city,
        area: this.addressForm.value.area,
        zip: this.addressForm.value.zip,
        state: this.addressData.state,
        country: this.addressData.country
      }
      this.dialogRef.close(this.addressData);
    }
  }
}
