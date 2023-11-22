import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { DriverStanding } from '../driver-standings/utils/driver-standing.interface';
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
  public submit({ points, position, id }: DriverStanding): void {
    this.firebaseService.writeData({ id, points, position });
  }
}
