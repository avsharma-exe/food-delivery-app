import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {HttpClientModule} from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule,HttpClientModule],providers: [UserService]});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
  });
  it('should have getUser function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUser).toBeTruthy();
   });
});
