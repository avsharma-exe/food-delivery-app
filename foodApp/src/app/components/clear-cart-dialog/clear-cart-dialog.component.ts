import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/utilities/user.service';

@Component({
  selector: 'app-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  styleUrls: ['./clear-cart-dialog.component.scss']
})
export class ClearCartDialogComponent implements OnInit {

  constructor(private _userService: UserService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  clearCart() {
    this._userService.clearCart().subscribe(async (data) => {
      await this._userService.updateUserDataLocal();
      this.dialog.closeAll();
    })
  }

  onDenied(){
    this.dialog.closeAll();
  }
}
