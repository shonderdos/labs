import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { CommonModule } from '@angular/common';
import { ContrsuctorStandingsService } from './data-access/constructor-standings.service';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';

@Component({
  standalone: true,
  imports: [OrdinalPipe, CommonModule, StandingsCardComponent],
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
export class ConstructorStandingsComponent {
  constructor(private constructorStandingService: ContrsuctorStandingsService) {}

  public standings$ = this.constructorStandingService.constructorStandings;
}
