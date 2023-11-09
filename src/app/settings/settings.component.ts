import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DarkModePreference, DarkModeService } from '../shared/services/dark-mode/dark-mode.service';
import { AsyncPipe } from '@angular/common';

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
          <div class="select">
            <select (change)="updatePreference($any($event.target).value)" [value]="darkModePreference | async">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system-default">System default</option>
            </select>
          </div>
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
        margin-top: 0;
        color: var(--body-text-color);
      }

      p {
        font-size: 13px;
        color: rgb(148, 163, 184);
        margin: 0;
      }

      section {
        display: flex;
        flex-direction: column;
        justify-content: center;
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

      select {
        // A reset of styles, including removing the default dropdown arrow
        appearance: none;
        // Additional resets for further consistency
        background-color: transparent;
        border: none;
        padding: 16px;
        margin: 0;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        cursor: inherit;
        line-height: inherit;
        outline: none;
      }

      select::-ms-expand {
        display: none;
      }

      .select {
        box-sizing: border-box;
        height: 48px;
        width: 100%;
        min-width: 15ch;
        max-width: 30ch;
        border: 1px solid var(--select-border-color);
        border-radius: 6px;
        padding: 0;
        font-size: 14px;
        cursor: pointer;
        //line-height: 1.1;
        background-color: var(--select-background-color);
        display: grid;
        grid-template-areas: 'select';
        align-items: center;
        color: var(--select-text-color);
      }

      select,
      .select:after {
        grid-area: select;
      }

      .select::after {
        content: '';
        width: 0.8em;
        height: 0.5em;
        background-color: var(--select-arrow-color);
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        justify-self: end;
        margin-right: 16px;
      }

      .select:focus-within::after {
        background-color: var(--select-border-color-focus);
      }

      .select:focus-within {
        border-color: var(--select-border-color-focus);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export default class SettingsComponent {
  private darkModeService = inject(DarkModeService);
  public darkModePreference = this.darkModeService.preference;

  updatePreference(value: DarkModePreference) {
    this.darkModeService.updatePreference(value);
  }
}
