import { effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from '../local-storage/local-storage.service';

export enum DarkModePreference {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM_DEFAULT = 'system-default',
}

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private localStoreService = inject(LocalStorageService);
  private document = inject(DOCUMENT);

  public preference = signal<DarkModePreference>(this.loadPreferenceFromLocalStore() ?? DarkModePreference.DARK);

  constructor() {
    this.updateUIEffect();
    this.updateLocalStorageEffect();
  }
  public init() {
    this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (this.preference() === DarkModePreference.SYSTEM_DEFAULT) {
        event.matches ? this.enable() : this.disable();
      }
    });
  }

  public updatePreference(preference: DarkModePreference) {
    this.preference.set(preference);
  }

  private updateUIEffect() {
    effect(() => {
      if (this.preference() === DarkModePreference.DARK) {
        this.enable();
        return;
      }

      if (this.preference() === DarkModePreference.LIGHT) {
        this.disable();
        return;
      }

      if (this.preference() === DarkModePreference.SYSTEM_DEFAULT) {
        this.isSystemDarkMode() ? this.enable() : this.disable();
        return;
      }
    });
  }

  private updateLocalStorageEffect() {
    effect(() => {
      this.localStoreService.set('darkMode', this.preference());
    });
  }

  private enable() {
    this.document.body.classList.add('dark');
  }

  private disable() {
    this.document.body.classList.remove('dark');
  }

  private isSystemDarkMode(): boolean {
    return this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }

  private loadPreferenceFromLocalStore() {
    return this.localStoreService.get<DarkModePreference>('darkMode');
  }
}
