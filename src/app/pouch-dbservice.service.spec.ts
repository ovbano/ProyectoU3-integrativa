import { TestBed } from '@angular/core/testing';

import { PouchDBServiceService } from './pouch-dbservice.service';

describe('PouchDBServiceService', () => {
  let service: PouchDBServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouchDBServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
