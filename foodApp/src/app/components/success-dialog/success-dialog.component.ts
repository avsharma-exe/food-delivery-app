import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(private dialog: MatDialogRef<SuccessDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialog.close()
  }
}
