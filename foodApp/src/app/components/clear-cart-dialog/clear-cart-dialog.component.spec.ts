import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCartDialogComponent } from './clear-cart-dialog.component';

describe('ClearCartDialogComponent', () => {
  let component: ClearCartDialogComponent;
  let fixture: ComponentFixture<ClearCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
