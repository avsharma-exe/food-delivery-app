import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentOwnerHomeComponent } from './restaurent-owner-home.component';

describe('RestaurentOwnerHomeComponent', () => {
  let component: RestaurentOwnerHomeComponent;
  let fixture: ComponentFixture<RestaurentOwnerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentOwnerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurentOwnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
