import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { DriverStandingsService } from './data-access/driver-standings.service';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';

@Component({
  standalone: true,
  imports: [OrdinalPipe, NgIf, AsyncPipe, NgFor, StandingsCardComponent],
  selector: 'app-driver-interfaces',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 }), stagger(20, [animate('0.20s', style({ opacity: 1 }))])]),
      ]),
    ]),
  ],
  templateUrl: './driver-standings.component.html',
  styleUrls: ['driver-standings.component.scss'],
})
export default class DriverStandingsComponent {
  constructor(private standingsService: DriverStandingsService) {}

  public standings$ = this.standingsService.driverStandings;
}
