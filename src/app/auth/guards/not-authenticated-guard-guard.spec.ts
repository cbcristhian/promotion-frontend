import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notAuthenticatedGuardGuard } from './not-authenticated-guard-guard';

describe('notAuthenticatedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      notAuthenticatedGuardGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
