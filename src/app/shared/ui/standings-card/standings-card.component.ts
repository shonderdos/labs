import { Component, HostBinding, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-standings-card',
  templateUrl: './standings-card.component.html',
  styleUrls: ['./standings-card.component.scss'],
  imports: [NgClass],
})
export class StandingsCardComponent {
  @HostBinding('class.someClass') someField = false;
  @Input() public constructorId: string | undefined;
}
