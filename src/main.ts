import { APP_INITIALIZER, enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { DarkModeService } from './app/shared/services/dark-mode/dark-mode.service';
import { RedirectService } from './app/shared/services/redirect/redirect.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    BrowserAnimationsModule,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: DarkModeService) => service.init(),
      deps: [DarkModeService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: RedirectService) => service.init(),
      deps: [RedirectService],
      multi: true,
    },
  ],
});
