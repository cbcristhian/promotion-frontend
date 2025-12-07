import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '' } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }
    });
  }
}
