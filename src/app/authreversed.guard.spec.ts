import { TestBed } from '@angular/core/testing';

import { AuthreversedGuard } from './authreversed.guard';

describe('AuthreversedGuard', () => {
  let guard: AuthreversedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthreversedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
