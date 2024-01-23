import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly isOpened = signal(false);

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
