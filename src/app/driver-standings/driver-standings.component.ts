import { Component, inject } from '@angular/core';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';

@Component({
  standalone: true,
  imports: [OrdinalPipe, AsyncPipe, StandingsCardComponent, JsonPipe, NgOptimizedImage],
  selector: 'app-driver-interfaces',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['driver-standings.component.scss'],
})
export default class DriverStandingsComponent {
  public standings = inject(FirebaseService).getDriverStandings();
}
