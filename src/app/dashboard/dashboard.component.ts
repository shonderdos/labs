import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { AsyncPipe } from '@angular/common';
import { combineLatest, debounceTime, distinctUntilChanged, map, of, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { DriverRowComponent } from './driver-row/driver-row.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { InputComponent } from '../shared/ui/input/input.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    MatIconModule,
    FormsModule,
    DriverRowComponent,
    PageWrapperComponent,
    PanelComponent,
    MatIconModule,
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
})
export default class DashboardComponent {
  private firebaseService = inject(FirebaseService);
  public drivers = this.firebaseService.getDriverStandings() || of([]);

  public searchControl = new FormControl();
  private searchTerm = this.searchControl.valueChanges.pipe(
    debounceTime(150),
    map((event) => (event.target as HTMLInputElement).value),
    distinctUntilChanged(),
    startWith('')
  );

  public filteredDrivers = combineLatest([this.drivers, this.searchTerm]).pipe(
    map(([drivers, filter]) => {
      return drivers.filter(({ firstName, lastName }) => {
        return [firstName, lastName].some((name) => name?.toLowerCase().includes(filter.toLowerCase()));
      });
    })
  );

  public addNewDriver() {
    this.firebaseService.addNewDriver();
  }
}
