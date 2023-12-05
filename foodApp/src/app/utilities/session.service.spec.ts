import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],providers: [SessionService]});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService  );
    expect(service).toBeTruthy();
  });

  it('should have setLocalSession function', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service.setLocalSession).toBeTruthy();
   });
});
