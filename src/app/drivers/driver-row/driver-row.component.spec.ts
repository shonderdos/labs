import { createDriverStanding } from './utils/fixtures/driver-standing.fixutre';
import { By } from '@angular/platform-browser';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { TestBed } from '@angular/core/testing';
import { DriverRowComponent } from './driver-row.component';
import { Component } from '@angular/core';
import { DriverStanding } from '../../shared/interfaces/driver-standing.interface';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  function arrange({
    host,
  }: { host?: { isFirst?: boolean; driver?: DriverStanding }; firebaseService?: Partial<FirebaseService> } = {}) {
    @Component({
      standalone: true,
      imports: [DriverRowComponent],
      template: `<app-driver-row [driver]="driver" [isFirst]="isFirst" />`,
    })
    class TestHostComponent {
      driver = host?.driver ?? createDriverStanding();
      isFirst = host?.isFirst ?? false;
    }
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      imports: [DriverRowComponent, TestHostComponent],
    });

    const fixture = TestBed.createComponent(TestHostComponent);
    const debugElement = fixture.debugElement.query(By.directive(DriverRowComponent));
    const component = fixture.debugElement.query(By.directive(DriverRowComponent)).componentInstance;

    fixture.detectChanges();

    return {
      fixture,
      component,
      debugElement,
    };
  }
  it('should display name for a driver', async () => {
    const driverStandings = createDriverStanding({
      firstName: 'Lewis',
      lastName: 'Hamilton',
    });
    const { fixture, debugElement } = arrange({
      host: {
        driver: driverStandings,
      },
    });

    await fixture.whenStable();
    const firstNameElement = debugElement.query(By.css('[data-test-id="name"]')).nativeElement;

    expect(firstNameElement.textContent).toEqual(`${driverStandings.firstName} ${driverStandings.lastName}`);
  });

  it('should have a border top class if it is the first driver', async () => {
    const { fixture, debugElement } = arrange({
      host: {
        isFirst: true,
      },
    });
    await fixture.whenStable();
    const firstNameElement = debugElement.query(By.css('[data-test-id="row"]')).nativeElement;

    expect(firstNameElement.classList).toContain('border-top');
  });

  it('should not have a border top class if it is not the first driver', async () => {
    const { fixture, debugElement } = arrange({
      host: {
        isFirst: false,
      },
    });
    await fixture.whenStable();
    const firstNameElement = debugElement.query(By.css('[data-test-id="row"]')).nativeElement;

    expect(firstNameElement.classList).not.toContain('border-top');
  });
});
