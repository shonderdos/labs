import { APP_INITIALIZER, enableProdMode, inject } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DarkModeService } from './app/shared/services/dark-mode/dark-mode.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    BrowserAnimationsModule,
    {
      provide: APP_INITIALIZER,
      useFactory: () => inject(DarkModeService).init(),
    },
  ],
});
