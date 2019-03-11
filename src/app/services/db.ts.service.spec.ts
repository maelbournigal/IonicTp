import { TestBed } from '@angular/core/testing';

import { Db } from './db.ts.service';

describe('Db.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Db = TestBed.get(Db);
    expect(service).toBeTruthy();
  });
});
