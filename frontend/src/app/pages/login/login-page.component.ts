import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { getApiError } from '../../core/api-error';
import { AuthService } from '../../core/auth.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, IconComponent],
  template: `
    <main class="auth-page">
      <section class="auth-panel">
        <a routerLink="/" class="auth-brand">
          <span class="brand-mark"><app-icon name="car" /></span>
          <span>Car Manager</span>
        </a>

        <h1>Iniciar sesion</h1>
        <app-alert [message]="error" />

        <form class="auth-form" [formGroup]="form" (ngSubmit)="submit()">
          <label>
            <span>Email</span>
            <input type="email" formControlName="email" autocomplete="email" required />
          </label>

          <label>
            <span>Contrasena</span>
            <input type="password" formControlName="password" autocomplete="current-password" required />
          </label>

          <button type="submit" class="button button-primary" [disabled]="loading || form.invalid">
            @if (loading) {
              <span class="loader" aria-hidden="true"></span>
            } @else {
              <app-icon name="save" />
            }
            Entrar
          </button>
        </form>

        <p class="auth-switch">
          No tienes cuenta?
          <a routerLink="/register">Registrate</a>
        </p>
      </section>
    </main>
  `
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  loading = false;
  error = '';

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth
      .login(this.form.getRawValue())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => void this.router.navigate(['/']),
        error: (error: unknown) => (this.error = getApiError(error))
      });
  }
}
