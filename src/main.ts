import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app-routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DarkModeService } from './app/shared/services/dark-mode.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), HttpClientModule, BrowserAnimationsModule),
    {
      provide: APP_INITIALIZER,
      useFactory: (darkModeService: DarkModeService) => () => darkModeService.init(),
      deps: [DarkModeService],
      multi: true,
    },
  ],
});
