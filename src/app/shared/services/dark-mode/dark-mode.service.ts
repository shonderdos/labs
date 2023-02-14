import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, distinctUntilChanged, of, pipe, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

export enum DarkModePreference {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM_DEFAULT = 'system-default',
}

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private preferenceSubject = new BehaviorSubject<DarkModePreference>(
    this.loadPreferenceFromLocalStore() ?? DarkModePreference.DARK
  );
  public preference = this.preferenceSubject.pipe(distinctUntilChanged(), this.updateUI(), this.updateLocalStorage());

  constructor(@Inject(DOCUMENT) private document: Document, private localStoreService: LocalStorageService) {}

  public init() {
    const preference = this.loadPreferenceFromLocalStore() ?? DarkModePreference.DARK;
    this.updateUI()(of(preference)).subscribe();
    this.updateLocalStorage()(of(preference)).subscribe();

    this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (this.preferenceSubject.value === DarkModePreference.SYSTEM_DEFAULT) {
        event.matches ? this.enable() : this.disable();
      }
    });
  }

  public updatePreference(preference: DarkModePreference) {
    this.preferenceSubject.next(preference);
  }

  private updateUI() {
    return pipe(
      tap((preference: DarkModePreference) => {
        if (preference === DarkModePreference.DARK) {
          this.enable();
          return;
        }

        if (preference === DarkModePreference.LIGHT) {
          this.disable();
          return;
        }

        if (preference === DarkModePreference.SYSTEM_DEFAULT) {
          this.isSystemDarkMode() ? this.enable() : this.disable();
          return;
        }
      })
    );
  }

  private updateLocalStorage() {
    return pipe(
      tap((preference: DarkModePreference) => {
        this.localStoreService.set('darkMode', preference);
      })
    );
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
