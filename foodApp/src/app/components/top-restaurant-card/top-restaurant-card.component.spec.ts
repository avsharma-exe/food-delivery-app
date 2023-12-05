import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRestaurantCardComponent } from './top-restaurant-card.component';

describe('TopRestaurantCardComponent', () => {
  let component: TopRestaurantCardComponent;
  let fixture: ComponentFixture<TopRestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRestaurantCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRestaurantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
