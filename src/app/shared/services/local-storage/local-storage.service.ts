import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public get<T>(key: string): T | null {
    return localStorage.getItem(key) as T;
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
