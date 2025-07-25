import { TestBed } from '@angular/core/testing';

import { SulworkService } from './sulwork.service';

describe('SulworkService', () => {
  let service: SulworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SulworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
