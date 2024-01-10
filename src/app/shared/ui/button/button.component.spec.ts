import { ButtonComponent } from './button.component';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

function arrange(overrides?: { host: { icon?: string; content?: string; addNewDriver?: () => void } }) {
  @Component({
    standalone: true,
    imports: [ButtonComponent],
    template: `<app-button [icon]="icon" (click)="addNewDriver()">{{ content }}</app-button>`,
  })
  class TestHostComponent {
    icon = overrides?.host?.icon ?? null;
    content = overrides?.host?.content ?? null;
    addNewDriver = overrides?.host?.addNewDriver ?? null;
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
    const { debugElement } = arrange({ host: { icon } });
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
    const { debugElement } = arrange({ host: { content } });
    const textEl = debugElement.query(By.css('button'));
    expect(textEl.nativeElement.textContent).toBe(content);
  });

  it('should emit when the button is clicked', () => {
    const addNewDriver = jest.fn();
    const { debugElement } = arrange({ host: { addNewDriver } });
    debugElement.query(By.css('button')).nativeElement.click();
    expect(addNewDriver).toHaveBeenCalled();
  });
});
