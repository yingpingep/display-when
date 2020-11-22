import { TestBed } from '@angular/core/testing';

import { DisplayWhenService } from './display-when.service';

describe('DisplayWhenService', () => {
  let service: DisplayWhenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayWhenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
