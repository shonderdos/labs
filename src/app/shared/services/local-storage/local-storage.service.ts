import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public get<T>(key: string): T | null {
    const result = localStorage.getItem(key);
    if (result === null) {
      return null;
    }
    if (['true', 'false'].includes(result)) {
      return result === 'true' ? (true as T) : (false as T);
    }
    return result as T;
  }

  public set(key: string, value: string | boolean): void {
    if (typeof value === 'boolean') {
      value = value.toString();
    }
    localStorage.setItem(key, value);
  }
}
