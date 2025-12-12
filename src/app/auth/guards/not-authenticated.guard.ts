import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const NotAuthenticatedGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  if (isAuthenticated) {
    if (authService.isAdmin()) {
      router.navigateByUrl('/admin');
      return false;
    } else if (authService.isResident()) {
      router.navigateByUrl('/resident');
      return false;
    }
  }

  return true;
};
