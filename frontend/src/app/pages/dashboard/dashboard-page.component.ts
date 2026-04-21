import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { getApiError } from '../../core/api-error';
import { CarService } from '../../core/car.service';
import { CarFilters, CarResponse } from '../../models/car.models';
import { AlertComponent } from '../../shared/alert/alert.component';
import { CarCardComponent } from '../../shared/car-card/car-card.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, CarCardComponent, EmptyStateComponent, IconComponent],
  template: `
    <section class="section-heading">
      <div>
        <span class="eyebrow">Garaje</span>
        <h2>Mis autos</h2>
      </div>
      <a routerLink="/cars/new" class="button button-primary">
        <app-icon name="plus" />
        Nuevo auto
      </a>
    </section>

    <form class="filter-bar" [formGroup]="filtersForm" (ngSubmit)="loadCars()">
      <label>
        <span>Marca</span>
        <input formControlName="brand" />
      </label>

      <label>
        <span>Modelo</span>
        <input formControlName="model" />
      </label>

      <label>
        <span>Placa</span>
        <input formControlName="plate" />
      </label>

      <label>
        <span>Color</span>
        <input formControlName="color" />
      </label>

      <label>
        <span>A&ntilde;o</span>
        <input formControlName="year" inputmode="numeric" pattern="[0-9]*" maxlength="4" (input)="sanitizeYear($event)" />
      </label>

      <div class="filter-actions">
        <button type="submit" class="button button-primary" [disabled]="loading()">
          <app-icon name="search" />
          Buscar
        </button>
        <button type="button" class="button button-ghost" [disabled]="loading()" (click)="clearFilters()">
          Limpiar
        </button>
      </div>
    </form>

    <app-alert [message]="error()" />

    @if (loading()) {
      <div class="loading-panel">
        <span class="loader" aria-hidden="true"></span>
        <strong>Cargando autos...</strong>
      </div>
    } @else if (cars().length === 0) {
      <app-empty-state />
    } @else {
      <section class="cars-grid" aria-label="Autos registrados">
        @for (car of cars(); track car.id) {
          <app-car-card [car]="car" (deleteRequest)="deleteCar($event)" />
        }
      </section>
    }
  `
})
export class DashboardPageComponent implements OnInit {
  private readonly carService = inject(CarService);
  private readonly formBuilder = inject(FormBuilder);

  readonly cars = signal<CarResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly filtersForm = this.formBuilder.nonNullable.group({
    brand: [''],
    model: [''],
    plate: [''],
    color: [''],
    year: ['']
  });

  ngOnInit(): void {
    this.loadCars();
  }

  sanitizeYear(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 4);
    input.value = value;
    this.filtersForm.controls.year.setValue(value, { emitEvent: false });
  }

  clearFilters(): void {
    this.filtersForm.reset();
    this.loadCars();
  }

  loadCars(): void {
    this.loading.set(true);
    this.error.set('');

    this.carService
      .getCars(this.buildFilters())
      .pipe(
        timeout(15000),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (cars) => this.cars.set(cars),
        error: (error: unknown) => this.error.set(getApiError(error))
      });
  }

  deleteCar(car: CarResponse): void {
    const confirmed = window.confirm(`Eliminar ${car.brand} ${car.model} (${car.plate})?`);
    if (!confirmed) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.carService
      .deleteCar(car.id)
      .pipe(
        timeout(15000),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this.cars.update((cars) => cars.filter((current) => current.id !== car.id));
        },
        error: (error: unknown) => this.error.set(getApiError(error))
      });
  }

  private buildFilters(): CarFilters {
    const rawFilters = this.filtersForm.getRawValue();
    return {
      brand: rawFilters.brand.trim(),
      model: rawFilters.model.trim(),
      plate: rawFilters.plate.trim(),
      color: rawFilters.color.trim(),
      year: rawFilters.year ? Number(rawFilters.year) : undefined
    };
  }
}
