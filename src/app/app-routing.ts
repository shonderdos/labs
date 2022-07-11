import { Routes } from '@angular/router';
import { DriverStandingsComponent } from './components/driver-standings/driver-standings.component';
import { ConstructorStandingsComponent } from './components/constructor-standings/constructor-standings.component';

export const routes: Routes = [
  { path: 'drivers', component: DriverStandingsComponent },
  { path: 'constructors', component: ConstructorStandingsComponent },
  { path: '', redirectTo: '/drivers', pathMatch: 'full' },
];
