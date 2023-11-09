import { Component } from '@angular/core';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';

@Component({
  standalone: true,
  imports: [OrdinalPipe, NgClass, AsyncPipe, StandingsCardComponent, NgOptimizedImage],
  selector: 'app-constructor-interfaces',
  templateUrl: 'constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.scss'],
})
export default class ConstructorStandingsComponent {
  constructor(private firebaseService: FirebaseService) {}

  public standings = this.firebaseService.getConstructorStandings();
}
