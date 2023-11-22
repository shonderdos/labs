import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { AsyncPipe } from '@angular/common';
import { combineLatest, debounceTime, distinctUntilChanged, map, of, startWith, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { DriverRowComponent } from './driver-row/driver-row.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FormsModule, DriverRowComponent, PageWrapperComponent],
})
export default class DashboardComponent {
  private firebaseService = inject(FirebaseService);
  public drivers = this.firebaseService.getDriverStandings() || of([]);
  public searchEvent = new Subject<Event>();

  private searchTerm = this.searchEvent.pipe(
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
