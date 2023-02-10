import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSwitcherService } from '../shared/services/theme-switcher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="wrapper">
      <h1>Settings</h1>
      <div class="panel">
        <div class="settings-row">
          <section>
            <h2>Dark mode</h2>
            <p>Switch between dark or light mode</p>
          </section>
          <input type="checkbox" [checked]="darkMode | async" (change)="switchDarkmode()" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 55px 0;
        color: var(--body-text-color);
      }

      h2 {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        color: var(--body-text-color);
      }

      p {
        font-size: 13px;
        color: rgb(148, 163, 184);
        margin: 0;
      }

      .wrapper {
        max-width: 1080px;
        margin: 0 auto;
      }

      .settings-row {
        display: flex;
        justify-content: space-between;
      }

      .panel {
        background-color: var(--panel-background-color);
        border-radius: 16px;
        padding: 2.5rem;
        box-shadow: var(--panel-box-shadow);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SettingsComponent {
  public darkMode = this.themeSwitcherService.isEnabled$;

  constructor(private themeSwitcherService: ThemeSwitcherService) {}

  switchDarkmode() {
    this.themeSwitcherService.toggle();
  }
}
