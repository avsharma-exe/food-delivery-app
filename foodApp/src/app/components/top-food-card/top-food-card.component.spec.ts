import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFoodCardComponent } from './top-food-card.component';

describe('TopFoodCardComponent', () => {
  let component: TopFoodCardComponent;
  let fixture: ComponentFixture<TopFoodCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFoodCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFoodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
