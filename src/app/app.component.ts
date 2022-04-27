import { Component } from '@angular/core';
import { StandingsService } from './services/standings/standings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private standingsService: StandingsService) {}

  public standings = this.standingsService.driverStandings;
}
