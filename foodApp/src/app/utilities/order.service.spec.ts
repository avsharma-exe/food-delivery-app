import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],providers: [OrderService]});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
  it('should have getUserOrders function', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service.getUserOrders).toBeTruthy();
   });
});
