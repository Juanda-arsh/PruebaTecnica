import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { getApiError } from '../../core/api-error';
import { CarService } from '../../core/car.service';
import { CarRequest } from '../../models/car.models';
import { AlertComponent } from '../../shared/alert/alert.component';
import { CarFormComponent } from '../../shared/car-form/car-form.component';

@Component({
  selector: 'app-car-create-page',
  standalone: true,
  imports: [RouterLink, AlertComponent, CarFormComponent],
  template: `
    <section class="section-heading">
      <div>
        <span class="eyebrow">Nuevo registro</span>
        <h2>Crear auto</h2>
      </div>
      <a routerLink="/" class="button button-ghost">Volver</a>
    </section>

    <app-alert [message]="error" />
    <app-car-form submitLabel="Crear auto" [loading]="loading" (saveCar)="save($event)" />
  `
})
export class CarCreatePageComponent {
  private readonly carService = inject(CarService);
  private readonly router = inject(Router);

  loading = false;
  error = '';

  save(payload: CarRequest): void {
    this.loading = true;
    this.error = '';

    this.carService
      .createCar(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => void this.router.navigate(['/']),
        error: (error: unknown) => (this.error = getApiError(error))
      });
  }
}
