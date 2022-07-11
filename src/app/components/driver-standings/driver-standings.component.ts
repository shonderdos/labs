import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { StandingsService } from '../../services/standings/standings.service';
import { OrdinalPipe } from '../../services/pipes/ordinal/ordinal.pipe';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [OrdinalPipe, CommonModule],
  selector: 'app-driver-standings',
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
export class DriverStandingsComponent {
  constructor(private standingsService: StandingsService) {}

  public standings$ = this.standingsService.driverStandings;
}
