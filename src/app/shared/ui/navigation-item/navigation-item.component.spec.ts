import { TestBed } from '@angular/core/testing';
import { NavigationItemComponent } from './navigation-item.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [NavigationItemComponent],
  template: `<app-navigation-item [link]="link" [name]="name" [icon]="icon" />`,
})
class TestHostComponent {
  link = '/test';
  name = 'Test';
  icon = 'test';
}

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ standalone: true, selector: 'mat-icon', template: '<ng-content></ng-content>' })
class MatIconComponent {}

function arrange() {
  TestBed.configureTestingModule({
    imports: [NavigationItemComponent, TestHostComponent],
  }).overrideComponent(NavigationItemComponent, {
    remove: {
      imports: [RouterLink, MatIconModule],
    },
    add: {
      imports: [RouterTestingModule, MatIconComponent],
    },
  });

  const fixture = TestBed.createComponent(TestHostComponent);
  const debugElement = fixture.debugElement.query(By.directive(NavigationItemComponent));
  const component = fixture.debugElement.query(By.directive(NavigationItemComponent)).componentInstance;

  fixture.detectChanges();

  return { fixture, component, debugElement };
}
describe('NavigationItemComponent', () => {
  it('should create an instance', () => {
    const { component } = arrange();

    expect(component).toBeTruthy();
  });

  it('should pass the correct route to the routerLink directive', () => {
    const { debugElement } = arrange();

    const divEl = debugElement.query(By.css('div'));
    const [key, value] = Object.entries(divEl.attributes).find(([, value]) => value === '/test') ?? [null, null];
    expect(key).toBe('ng-reflect-router-link');
    expect(value).toBe('/test');
  });

  it('should show the correct name', () => {
    const { debugElement } = arrange();

    const divEl = debugElement.query(By.css('span'));
    expect(divEl.nativeElement.textContent).toBe('Test');
  });

  it('should show the correct icon', () => {
    const { debugElement } = arrange();

    const divEl = debugElement.query(By.css('mat-icon'));
    expect(divEl.nativeElement.textContent).toBe('test');
  });
});
