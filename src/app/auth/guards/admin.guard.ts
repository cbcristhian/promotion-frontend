import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { firstValueFrom } from 'rxjs';

export const adminGuard: CanMatchFn = async () => {
  const auth = inject(AuthService);
  await firstValueFrom(auth.checkStatus());

  return auth.isAdmin();
};
