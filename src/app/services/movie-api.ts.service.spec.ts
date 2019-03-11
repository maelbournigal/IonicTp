import { TestBed } from '@angular/core/testing';

import { MovieApi } from './movie-api.ts.service';

describe('MovieApi', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieApi = TestBed.get(MovieApi);
    expect(service).toBeTruthy();
  });
});
