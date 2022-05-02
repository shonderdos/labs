import { Component } from '@angular/core';
import { StandingsService } from './services/standings/standings.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 }), stagger(20, [animate('0.20s', style({ opacity: 1 }))])]),
      ]),
    ]),
  ],
})
export class AppComponent {
  constructor(private standingsService: StandingsService) {}

  public standings$ = this.standingsService.driverStandings;
}
