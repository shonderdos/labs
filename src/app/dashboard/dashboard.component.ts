import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { DriverRowComponent } from './driver-row/driver-row.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, DriverRowComponent],
})
export default class DashboardComponent {
  private firebaseService = inject(FirebaseService);
  public drivers = this.firebaseService.getDriverStandings() || of([]);
}
