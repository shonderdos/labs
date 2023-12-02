import { TestBed } from '@angular/core/testing';
import { StandingsCardComponent } from './standings-card.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const arrange = (overrides?: { host?: { constructorId?: string } }) => {
  @Component({
    standalone: true,
    imports: [StandingsCardComponent],
    template: '<app-standings-card [constructorId]="constructorId"></app-standings-card>',
  })
  class HostComponent {
    constructorId = overrides?.host?.constructorId;
  }
  TestBed.configureTestingModule({
    imports: [StandingsCardComponent],
  });

  const fixture = TestBed.createComponent(HostComponent);
  const debugElement = fixture.debugElement.query(By.directive(StandingsCardComponent));
  const component = debugElement.componentInstance;

  fixture.detectChanges();

  return { fixture, debugElement, component };
};

describe('StandingsCardComponent', () => {
  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });
  it('should set constructorId as class', () => {
    const constructorId = 'mockedId';
    const { debugElement } = arrange({ host: { constructorId } });

    const result = debugElement.query(By.css(`.${constructorId}`));
    expect(result).toBeTruthy();
  });
});
