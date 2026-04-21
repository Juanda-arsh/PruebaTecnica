import { Component, input } from '@angular/core';

export type IconName = 'car' | 'plus' | 'search' | 'edit' | 'trash' | 'logout' | 'save';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      @switch (name()) {
        @case ('car') {
          <path d="M5 11l1.6-4.1A3 3 0 0 1 9.4 5h5.2a3 3 0 0 1 2.8 1.9L19 11" />
          <path d="M4 11h16a2 2 0 0 1 2 2v4h-2" />
          <path d="M4 17H2v-4a2 2 0 0 1 2-2" />
          <path d="M7 17h10" />
          <circle cx="6.5" cy="17" r="2" />
          <circle cx="17.5" cy="17" r="2" />
        }
        @case ('plus') {
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5L21 21" />
        }
        @case ('edit') {
          <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
          <path d="M14 7l3 3" />
        }
        @case ('trash') {
          <path d="M4 7h16" />
          <path d="M9 7V5h6v2" />
          <path d="M7 7l1 13h8l1-13" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        }
        @case ('logout') {
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M12 4h7v16h-7" />
        }
        @case ('save') {
          <path d="M5 4h12l2 2v14H5z" />
          <path d="M8 4v6h8V4" />
          <path d="M8 17h8" />
        }
      }
    </svg>
  `
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
