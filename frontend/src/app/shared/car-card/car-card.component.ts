import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarResponse } from '../../models/car.models';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <article class="car-card">
      <img class="car-image" [src]="car().photoUrl || '/car-placeholder.svg'" [alt]="car().brand + ' ' + car().model" />

      <div class="car-card-body">
        <div class="car-card-main">
          <div>
            <h2>{{ car().brand }} {{ car().model }}</h2>
            <p>{{ car().year }} - {{ car().color }}</p>
          </div>
          <span class="plate">{{ car().plate }}</span>
        </div>

        <div class="card-actions">
          <a [routerLink]="['/cars', car().id, 'edit']" class="button button-secondary button-small">
            <app-icon name="edit" />
            Editar
          </a>
          <button type="button" class="button button-danger button-small" (click)="deleteRequest.emit(car())">
            <app-icon name="trash" />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  `
})
export class CarCardComponent {
  readonly car = input.required<CarResponse>();

  @Output()
  readonly deleteRequest = new EventEmitter<CarResponse>();
}
