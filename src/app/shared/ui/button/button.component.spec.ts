import { ButtonComponent } from './button.component';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

function arrange(overrides?: { host?: Partial<ButtonComponent>; content?: string }) {
  @Component({
    standalone: true,
    imports: [ButtonComponent],
    template: `<app-button [icon]="icon" [displayMode]="displayMode" [theme]="theme">{{ content }}</app-button>`,
  })
  class TestHostComponent {
    icon = overrides?.host?.icon ?? null;
    displayMode = overrides?.host?.displayMode ?? 'text';
    theme = overrides?.host?.theme ?? 'primary';
    content = overrides?.content ?? null;
  }
  TestBed.configureTestingModule({
    imports: [TestHostComponent, ButtonComponent],
  });

  const fixture = TestBed.createComponent(TestHostComponent);
  const debugElement = fixture.debugElement.query(By.directive(ButtonComponent));
  const component = debugElement.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    component,
    debugElement,
  };
}
describe('ButtonComponent', () => {
  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });

  it('should show the correct icon', () => {
    const icon = 'test';
    const displayMode = 'icon';
    const { debugElement } = arrange({ host: { icon, displayMode } });
    const iconEl = debugElement.query(By.css('mat-icon'));
    expect(iconEl).toBeTruthy();
    expect(iconEl.nativeElement.textContent).toBe(icon);
  });

  it('should not show an icon', () => {
    const { debugElement } = arrange();
    const iconEl = debugElement.query(By.css('mat-icon'));
    expect(iconEl).toBeFalsy();
  });

  it('should show the correct text', () => {
    const content = 'test';
    const { debugElement } = arrange({ content });
    const textEl = debugElement.query(By.css('button'));
    expect(textEl.nativeElement.textContent).toBe(content);
  });
});
