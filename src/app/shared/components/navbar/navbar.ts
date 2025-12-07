import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authService = inject(AuthService);
}
