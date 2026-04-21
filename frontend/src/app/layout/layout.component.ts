import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { IconComponent } from '../shared/icons/icon.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <a routerLink="/" class="brand" aria-label="Ir al dashboard">
          <span class="brand-mark"><app-icon name="car" /></span>
          <span>Car Manager</span>
        </a>

        <nav class="topbar-nav" aria-label="Navegacion principal">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">Autos</a>
          <a routerLink="/cars/new" routerLinkActive="active" class="nav-link">Nuevo auto</a>
          <button type="button" class="icon-button" title="Cerrar sesion" aria-label="Cerrar sesion" (click)="logout()">
            <app-icon name="logout" />
          </button>
        </nav>
      </header>

      <main class="main-layout">
        <section class="user-strip">
          <div>
            <span class="eyebrow">Sesion activa</span>
            <h1>{{ greeting() }}</h1>
            <div class="user-email">{{ auth.user()?.email }}</div>
          </div>
          <a routerLink="/cars/new" class="button button-primary">
            <app-icon name="plus" />
            Agregar auto
          </a>
        </section>

        <router-outlet />
      </main>
    </div>
  `
})
export class LayoutComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly greeting = computed(() => `Hola, ${this.auth.user()?.name ?? 'usuario'}`);

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
