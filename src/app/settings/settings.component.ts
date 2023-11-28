import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DarkModePreference, DarkModeService } from '../shared/services/dark-mode/dark-mode.service';
import { AsyncPipe } from '@angular/common';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, PageWrapperComponent, PanelComponent],
})
export default class SettingsComponent {
  private darkModeService = inject(DarkModeService);
  public darkModePreference = this.darkModeService.preference;

  updatePreference(value: DarkModePreference) {
    this.darkModeService.updatePreference(value);
  }
}
