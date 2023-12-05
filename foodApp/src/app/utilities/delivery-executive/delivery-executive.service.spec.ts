import { TestBed } from '@angular/core/testing';

import { DeliveryExecutiveService } from './delivery-executive.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';


describe('DeliveryExecutiveService', () => {
  let service: DeliveryExecutiveService;
  let httpClient: HttpClient;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule,HttpClientModule],providers: [DeliveryExecutiveService]});

    service = TestBed.inject(DeliveryExecutiveService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    const service: DeliveryExecutiveService = TestBed.get(DeliveryExecutiveService);
        expect(service).toBeTruthy();
  });
  it('should have getOrders function', () => {
    const service: DeliveryExecutiveService = TestBed.get(DeliveryExecutiveService);
    expect(service.getOrders).toBeTruthy();
   });
});
