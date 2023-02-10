import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeSwitcherService {
  private value = true;
  private state = new BehaviorSubject(this.value);
  public isEnabled$ = this.state.asObservable().pipe(
    tap((enabled) => {
      enabled ? this.enable() : this.disable();
    }),
    shareReplay()
  );

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public toggle() {
    this.value = !this.value;
    this.state.next(this.value);
  }

  public init() {
    this.value ? this.enable() : this.disable();
  }

  private enable() {
    this.document.body.classList.add('dark');
  }

  private disable() {
    this.document.body.classList.remove('dark');
  }
}
