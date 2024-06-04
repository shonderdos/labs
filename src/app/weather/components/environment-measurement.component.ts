import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';
import { EnvironmentMeasurementConfig } from '../weather.service';

@Component({
  selector: 'app-environment-measurement',
  styleUrl: './environment-measurement.component.scss',
  templateUrl: './environment-measurement.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, PanelComponent],
})
export class EnvironmentMeasurementComponent {
  @Input({ required: true }) config!: EnvironmentMeasurementConfig;
  abs = Math.abs;
}
