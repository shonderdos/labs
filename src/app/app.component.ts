import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './shared/ui/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'app-root',
  template: ` <app-navigation></app-navigation>

    <router-outlet></router-outlet>`,
})
export class AppComponent {}
