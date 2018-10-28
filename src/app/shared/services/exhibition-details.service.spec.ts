import { TestBed } from '@angular/core/testing';

import { ExhibitionDetailsService } from './exhibition-details.service';

describe('ExhibitionDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExhibitionDetailsService = TestBed.get(ExhibitionDetailsService);
    expect(service).toBeTruthy();
  });
});
