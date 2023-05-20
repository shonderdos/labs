import { Component } from '@angular/core';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';

@Component({
  standalone: true,
  imports: [OrdinalPipe, NgIf, AsyncPipe, NgFor, StandingsCardComponent, JsonPipe],
  selector: 'app-driver-interfaces',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['driver-standings.component.scss'],
})
export default class DriverStandingsComponent {
  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getDriverStandings();
  }

  public standings = this.firebaseService.driverStandings;
}
