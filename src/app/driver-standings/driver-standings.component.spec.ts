import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import DriverStandingsComponent from './driver-standings.component';
import { createDriverStanding } from './utils/fixtures/driver-standing.fixutre';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';

@Component({ standalone: true, selector: 'app-standings-card', template: '<ng-content></ng-content>' })
export class StandingCardStubComponent {
  @Input() constructorId: string | undefined;
}
@Pipe({ standalone: true, name: 'ordinal' })
export class OrdinalStubPipe implements PipeTransform {
  transform(value: number): string {
    return `fake: ${value}`;
  }
}
const arrange = (override?: { firebaseService?: Partial<FirebaseService> }) => {
  const stub = {
    firebaseService: {
      getDriverStandings: () => of([]),
      ...override?.firebaseService,
    },
  };

  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule],
    providers: [
      {
        provide: FirebaseService,
        useValue: stub.firebaseService,
      },
    ],
  }).overrideComponent(DriverStandingsComponent, {
    set: {
      imports: [NgOptimizedImage, AsyncPipe, StandingCardStubComponent, OrdinalStubPipe],
    },
  });

  const fixture = TestBed.createComponent(DriverStandingsComponent);
  const nativeElement = fixture.nativeElement;
  const componentInstance = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    nativeElement,
    componentInstance,
  };
};

describe('DriverStandingsComponent', () => {
  it('should compile', () => {
    const { componentInstance } = arrange();
    expect(componentInstance).toBeTruthy();
  });

  it('should call getDriverStandings on init', () => {
    const getDriverStandings = jest.fn();
    arrange({
      firebaseService: {
        getDriverStandings,
      },
    });
    expect(getDriverStandings).toHaveBeenCalled();
  });

  it('should display a row for each entry', () => {
    const driverStandings = [createDriverStanding(), createDriverStanding()];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const entries = fixture.debugElement.queryAll(By.css("[data-test-id='driver-entry']"));

    expect(entries).toHaveLength(2);
  });

  it('should apply correct input based on constructorsId', () => {
    const mockedId = 'mockedId';
    const driverStandings = [createDriverStanding({ constructorId: mockedId })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const constructorId = fixture.debugElement.query(By.css("[data-test-id='driver-entry']")).componentInstance
      .constructorId;

    expect(constructorId).toEqual(mockedId);
  });

  it('should display the first name', () => {
    const firstName = 'Nicholas';
    const driverStandings = [createDriverStanding({ firstName })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-first-name']"));

    expect(name.nativeElement.innerHTML).toContain(firstName);
  });

  it('should display the last name', () => {
    const lastName = 'Latifi';
    const driverStandings = [createDriverStanding({ lastName })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-last-name']"));

    expect(name.nativeElement.innerHTML).toContain(lastName);
  });

  it('should display the points', () => {
    const points = '86';
    const driverStandings = [createDriverStanding({ points })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-points']"));

    expect(name.nativeElement.innerHTML).toContain(points);
  });

  it('should display the position', () => {
    const position = 1;
    const driverStandings = [createDriverStanding({ position })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-position']"));

    expect(name.nativeElement.innerHTML).toContain(`fake: ${position}`);
  });

  it('should display the drivers portrait', () => {
    const driverId = 'mockedDriverId';
    const driverStandings = [createDriverStanding({ driverId })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const image = fixture.debugElement.query(By.css("[data-test-id='driver-portrait']"));
    expect(image.nativeElement.src).toContain(driverId);
  });

  it('should display the drivers number', () => {
    const driverNumber = 'mockedDriverNumber';
    const driverStandings = [createDriverStanding({ driverNumber })];
    const { fixture } = arrange({
      firebaseService: {
        getDriverStandings: () => new BehaviorSubject(driverStandings),
      },
    });

    const number = fixture.debugElement.query(By.css("[data-test-id='driver-number']"));
    expect(number.nativeElement.innerHTML).toContain(driverNumber);
  });
});
