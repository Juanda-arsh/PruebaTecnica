import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="empty-state">
      <app-icon name="car" />
      <h2>No hay autos registrados</h2>
      <p>Agrega tu primer auto para verlo en el tablero.</p>
      <a routerLink="/cars/new" class="button button-primary">
        <app-icon name="plus" />
        Nuevo auto
      </a>
    </section>
  `
})
export class EmptyStateComponent {}
