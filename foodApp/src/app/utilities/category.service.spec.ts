import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  HttpClient, HttpClientModule } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule,HttpClientModule],providers: [CategoryService]});
    service = TestBed.inject(CategoryService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
  it('should have getCategoryList function', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service.getCategoryList).toBeTruthy();
   });
});
