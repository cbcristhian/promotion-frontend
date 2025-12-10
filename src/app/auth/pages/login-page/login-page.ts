import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormUtils } from '../../../shared/utils/form-util';

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
  formUtils=FormUtils

  hasError = signal(false);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required,Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email = '', password = '' } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe({
      next:(isAuthenticated) => {
        if (isAuthenticated) {
          if (this.authService.isAdmin()) this.router.navigateByUrl('/admin');
          return;
        }else{
          this.hasError.set(true)
          setTimeout(() => this.hasError.set(false), 2500);
        }
      },
    })
  }
}
