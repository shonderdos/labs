import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NavigationComponent } from './shared/ui/navigation/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';

const arrange = () => {
  TestBed.configureTestingModule({
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    imports: [NoopAnimationsModule, AppComponent, RouterTestingModule],
  });

  const fixture = TestBed.createComponent(AppComponent);
  const nativeElement = fixture.nativeElement;
  const componentInstance = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    nativeElement,
    componentInstance,
  };
};

describe('AppComponent', () => {
  it('should compile', () => {
    const { componentInstance } = arrange();

    expect(componentInstance).toBeTruthy();
  });

  it('should have a router-outlet', () => {
    const { fixture } = arrange();

    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(routerOutlet).toBeTruthy();
  });
  it('should have a navigation component', () => {
    const { fixture } = arrange();

    const navigation = fixture.debugElement.query(By.directive(NavigationComponent));

    expect(navigation).toBeTruthy();
  });
});
