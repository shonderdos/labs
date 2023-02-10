import { Routes } from '@angular/router';
import { DriverStandingsComponent } from './driver-standings/driver-standings.component';
import { ConstructorStandingsComponent } from './constructor-standings/constructor-standings.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: 'drivers', component: DriverStandingsComponent },
  { path: 'constructors', component: ConstructorStandingsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/drivers', pathMatch: 'full' },
  { path: '**', redirectTo: '/drivers' },
];
