import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    @if (message()) {
      <div class="alert alert-error" role="alert">{{ message() }}</div>
    }
  `
})
export class AlertComponent {
  readonly message = input('');
}
