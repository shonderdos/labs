import { Component } from '@angular/core';
import { StandingsService } from '../../services/standings/standings.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-constructor-standings',
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
export class ConstructorStandingsComponent {
  constructor(private standingsService: StandingsService) {}

  public standings$ = this.standingsService.constructorStandings;
}
