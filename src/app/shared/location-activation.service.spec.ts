import { TestBed } from '@angular/core/testing';

import { LocationActivationService } from './location-activation.service';

describe('LocationActivationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationActivationService = TestBed.get(LocationActivationService);
    expect(service).toBeTruthy();
  });
});
