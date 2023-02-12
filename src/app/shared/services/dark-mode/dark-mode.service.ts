import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private value = true;
  private state = new BehaviorSubject(this.value);
  public isEnabled$ = this.state.asObservable().pipe(
    tap((enabled) => {
      enabled ? this.enable() : this.disable();
    }),
    shareReplay(1)
  );

  constructor(@Inject(DOCUMENT) private document: Document, private localStoreService: LocalStorageService) {}

  public toggle() {
    this.value = !this.value;
    this.state.next(this.value);
  }

  public init() {
    const preference = this.loadPreferenceFromLocalStore();
    if (preference !== null) {
      this.value = preference;
      this.state.next(this.value);
      preference ? this.enable() : this.disable();
      return;
    }
    this.value ? this.enable() : this.disable();
  }

  private loadPreferenceFromLocalStore() {
    return this.localStoreService.get<boolean>('darkMode');
  }

  private enable() {
    this.document.body.classList.add('dark');
    this.localStoreService.set('darkMode', true);
  }

  private disable() {
    this.document.body.classList.remove('dark');
    this.localStoreService.set('darkMode', false);
  }
}
