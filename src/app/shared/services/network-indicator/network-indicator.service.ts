import { Injectable } from '@angular/core';
import { of, timer, switchMap, merge, fromEvent, map, startWith, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkIndicatorService {
  private isOnline$ = merge(
    fromEvent(window, 'online').pipe(map(() => true)),
    fromEvent(window, 'offline').pipe(map(() => false))
  ).pipe(startWith(navigator.onLine));

  private timer$ = timer(5000).pipe(
    startWith(true),
    map((num) => !!num)
  );

  public state$ = this.isOnline$.pipe(
    switchMap((isOnline, index) => {
      const display = !(isOnline && !index);

      // first emit we never subscribe to the timer. If we are online we dont show the indicator at all. If we are offline we keep the indicator display to true
      return isOnline && index
        ? this.timer$.pipe(map((display) => ({ isOnline, display })))
        : of({ isOnline, display });
    }),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}
