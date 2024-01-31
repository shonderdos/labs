import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly localStorageKey = 'isNavigationOpened';
  private readonly isOpened = signal(false);

  constructor() {
    this.isOpened.set(this.localStorageService.get<boolean>(this.localStorageKey) ?? false);
    effect(() => this.localStorageService.set(this.localStorageKey, this.isOpened()));
  }

  public get isOpen(): Signal<boolean> {
    return this.isOpened.asReadonly();
  }

  public open(): void {
    this.isOpened.set(true);
  }
  public close(): void {
    this.isOpened.set(false);
  }
  public toggle(): void {
    this.isOpened.update((status) => !status);
  }
}
