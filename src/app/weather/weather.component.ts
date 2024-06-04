import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EnvironmentMeasurementComponent } from './components/environment-measurement.component';
import { WeatherService } from './weather.service';

@Component({
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, AsyncPipe, EnvironmentMeasurementComponent],
})
export default class WeatherComponent {
  #weather = inject(WeatherService).weather;
  wind_speed = this.#weather.pipe(map(({ wind_speed }) => wind_speed));
  temperature = this.#weather.pipe(map(({ temperature }) => temperature));
  chance_of_rain = this.#weather.pipe(map(({ chance_of_rain }) => chance_of_rain));
  uv_index = this.#weather.pipe(map(({ uv_index }) => uv_index));
  sunset = this.#weather.pipe(map(({ sunset }) => sunset));
}
