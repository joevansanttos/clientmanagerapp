import { TestBed } from '@angular/core/testing';

import { ExistphoneService } from './exist-phone.service';

describe('ExistphoneService', () => {
  let service: ExistphoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistphoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
