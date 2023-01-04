import { TestBed } from '@angular/core/testing';

import { DatabaseListService } from './database-list.service';

describe('DatabaseListService', () => {
  let service: DatabaseListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
