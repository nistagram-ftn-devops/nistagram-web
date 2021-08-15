import { TestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';

describe('RagingService', () => {
  let service: RagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
