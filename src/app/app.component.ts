import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/ui/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  selector: 'app-root',
  template: ` <app-navigation></app-navigation>

    <router-outlet></router-outlet>`,
})
export class AppComponent {}
