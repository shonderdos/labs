import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private router = inject(Router);

  public init() {
    return () =>
      new Promise((resolve) => {
        this.router.events
          .pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => event as NavigationEnd),
            map((event) => new URLSearchParams(event.url.split('?')[1])),
            filter((params) => params.has('redirect')),
            tap((params) => {
              this.router.navigate([params.get('redirect')]);
            })
          )
          .subscribe();
        resolve(true);
      });
  }
}
