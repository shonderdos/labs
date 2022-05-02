import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdinalPipe } from './services/pipes/ordinal/ordinal.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorStandingsComponent } from './components/constructor-standings/constructor-standings.component';
import { DriverStandingsComponent } from './components/driver-standings/driver-standings.component';

@NgModule({
  declarations: [AppComponent, ConstructorStandingsComponent, DriverStandingsComponent, OrdinalPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
