import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { AsyncPipe, NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';

@Component({
  standalone: true,
  imports: [OrdinalPipe, NgClass, NgIf, NgFor, AsyncPipe, StandingsCardComponent, NgOptimizedImage],
  selector: 'app-constructor-interfaces',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 }), stagger(20, [animate('0.20s', style({ opacity: 1 }))])]),
      ]),
    ]),
  ],
  templateUrl: 'constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.scss'],
})
export default class ConstructorStandingsComponent {
  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getConstructorStandings();
  }

  public standings = this.firebaseService.constructorStandings;
}
