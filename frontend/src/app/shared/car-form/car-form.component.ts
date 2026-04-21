import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarRequest } from '../../models/car.models';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent],
  template: `
    <form class="form-panel" [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-grid">
        <label>
          <span>Marca</span>
          <input formControlName="brand" maxlength="80" required />
        </label>

        <label>
          <span>Modelo</span>
          <input formControlName="model" maxlength="80" required />
        </label>

        <label>
          <span>A&ntilde;o</span>
          <input formControlName="year" inputmode="numeric" pattern="[0-9]*" maxlength="4" (input)="sanitizeYear($event)" required />
        </label>

        <label>
          <span>Placa</span>
          <input formControlName="plate" maxlength="20" required />
        </label>

        <label>
          <span>Color</span>
          <input formControlName="color" maxlength="50" required />
        </label>

        <label class="full-field">
          <span>Foto URL</span>
          <input formControlName="photoUrl" maxlength="500" placeholder="https://..." />
        </label>
      </div>

      <div class="form-actions">
        <button type="submit" class="button button-primary" [disabled]="loading || form.invalid">
          @if (loading) {
            <span class="loader" aria-hidden="true"></span>
          } @else {
            <app-icon name="save" />
          }
          {{ submitLabel }}
        </button>
      </div>
    </form>
  `
})
export class CarFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  @Input() loading = false;
  @Input() submitLabel = 'Guardar auto';

  @Input()
  set initialValues(value: Partial<CarRequest> | null) {
    if (!value) {
      return;
    }

    this.form.patchValue({
      brand: value.brand ?? '',
      model: value.model ?? '',
      year: value.year ? String(value.year) : String(new Date().getFullYear()),
      plate: value.plate ?? '',
      color: value.color ?? '',
      photoUrl: value.photoUrl ?? ''
    });
  }

  @Output()
  readonly saveCar = new EventEmitter<CarRequest>();

  readonly form = this.formBuilder.nonNullable.group({
    brand: ['', [Validators.required, Validators.maxLength(80)]],
    model: ['', [Validators.required, Validators.maxLength(80)]],
    year: [String(new Date().getFullYear()), [Validators.required, Validators.pattern(/^\d{4}$/)]],
    plate: ['', [Validators.required, Validators.maxLength(20)]],
    color: ['', [Validators.required, Validators.maxLength(50)]],
    photoUrl: ['', [Validators.maxLength(500)]]
  });

  sanitizeYear(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 4);
    input.value = value;
    this.form.controls.year.setValue(value, { emitEvent: false });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.saveCar.emit({
      brand: value.brand.trim(),
      model: value.model.trim(),
      year: Number(value.year),
      plate: value.plate.trim(),
      color: value.color.trim(),
      photoUrl: value.photoUrl.trim()
    });
  }
}
