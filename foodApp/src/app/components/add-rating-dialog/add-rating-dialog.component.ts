import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-rating-dialog',
  templateUrl: './add-rating-dialog.component.html',
  styleUrls: ['./add-rating-dialog.component.scss']
})
export class AddRatingDialogComponent implements OnInit {

  value:number = 0;

  totalstars:number = 0;
  readonly:boolean = false;
  constructor( public dialogRef: MatDialogRef<AddRatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {

   }

  ngOnInit(): void {
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
      this.data = $event.newValue;
  }

  applyRating(){
    this.dialogRef.close(this.data);
  }

  @Output()
  rating: EventEmitter<number> = new EventEmitter<number>();
}
