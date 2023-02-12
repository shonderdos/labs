import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public get<T>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (value === 'true' || value === 'false') {
      return JSON.parse(value);
    }

    return value as T;
  }

  public set(key: string, value: string | boolean): void {
    if (typeof value === 'boolean') {
      value = value.toString();
    }
    localStorage.setItem(key, value);
  }
}
