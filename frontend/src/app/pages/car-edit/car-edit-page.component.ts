import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { getApiError } from '../../core/api-error';
import { CarService } from '../../core/car.service';
import { CarRequest, CarResponse } from '../../models/car.models';
import { AlertComponent } from '../../shared/alert/alert.component';
import { CarFormComponent } from '../../shared/car-form/car-form.component';

@Component({
  selector: 'app-car-edit-page',
  standalone: true,
  imports: [RouterLink, AlertComponent, CarFormComponent],
  template: `
    <section class="section-heading">
      <div>
        <span class="eyebrow">Editar registro</span>
        <h2>Editar auto</h2>
      </div>
      <a routerLink="/" class="button button-ghost">Volver</a>
    </section>

    <app-alert [message]="error" />

    @if (initialValues) {
      <app-car-form submitLabel="Guardar cambios" [loading]="loading" [initialValues]="initialValues" (saveCar)="save($event)" />
    } @else if (loading) {
      <div class="loading-panel">
        <span class="loader" aria-hidden="true"></span>
        <strong>Cargando auto...</strong>
      </div>
    }
  `
})
export class CarEditPageComponent implements OnInit {
  private readonly carService = inject(CarService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly carId = this.route.snapshot.paramMap.get('id') ?? '';

  loading = false;
  error = '';
  initialValues: CarResponse | null = null;

  ngOnInit(): void {
    this.loadCar();
  }

  save(payload: CarRequest): void {
    this.loading = true;
    this.error = '';

    this.carService
      .updateCar(this.carId, payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => void this.router.navigate(['/']),
        error: (error: unknown) => (this.error = getApiError(error))
      });
  }

  private loadCar(): void {
    this.loading = true;
    this.error = '';

    this.carService
      .getCar(this.carId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (car) => (this.initialValues = car),
        error: (error: unknown) => (this.error = getApiError(error))
      });
  }
}
