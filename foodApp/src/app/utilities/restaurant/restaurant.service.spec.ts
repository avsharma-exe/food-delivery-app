import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule,HttpClientModule],providers: [RestaurantService]});
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    const service: RestaurantService = TestBed.get(RestaurantService);
    expect(service).toBeTruthy();
  });
  it('should have getTopRestaurants function', () => {
    const service: RestaurantService = TestBed.get(RestaurantService);
    expect(service.getTopRestaurants).toBeTruthy();
   });
});
