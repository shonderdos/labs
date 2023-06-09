import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
    `,
  ],
})
export class AppComponent {}
