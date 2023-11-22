import { createDriverStanding } from '../../driver-standings/utils/fixtures/driver-standing.fixutre';
import { By } from '@angular/platform-browser';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { TestBed } from '@angular/core/testing';
import { DriverRowComponent } from './driver-row.component';
import { Component } from '@angular/core';
import { DriverStanding } from '../../driver-standings/utils/driver-standing.interface';

describe('DashboardComponent', () => {
  function arrange({
    firebaseService,
    host,
  }: { host?: { driver: DriverStanding }; firebaseService?: Partial<FirebaseService> } = {}) {
    @Component({
      standalone: true,
      imports: [DriverRowComponent],
      template: `<app-driver-row [driver]="driver" />`,
    })
    class TestHostComponent {
      driver = host?.driver ?? createDriverStanding();
    }
    const stub = {
      firebaseService: {
        writeData: () => {},
        ...firebaseService,
      },
    };
    TestBed.configureTestingModule({
      imports: [DriverRowComponent, TestHostComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: stub.firebaseService,
        },
      ],
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
  it('should have all the elements for each driver', async () => {
    const driverStandings = createDriverStanding({
      firstName: 'Lewis',
      lastName: 'Hamilton',
      constructorName: 'Mercedes',
      position: 1,
      points: '100',
    });
    const { fixture, debugElement } = arrange({
      host: {
        driver: driverStandings,
      },
    });

    await fixture.whenStable();
    const firstNameElement = debugElement.query(By.css('[data-test-id="first-name"]')).nativeElement;
    const lastNameElement = debugElement.query(By.css('[data-test-id="last-name"]')).nativeElement;
    const constructorElement = debugElement.query(By.css('[data-test-id="constructor-name"]')).nativeElement;
    const positionElement = debugElement.query(By.css('[data-test-id="position"]')).nativeElement;
    const pointsElement = debugElement.query(By.css('[data-test-id="points"]')).nativeElement;

    expect(firstNameElement.textContent).toEqual(driverStandings.firstName);
    expect(lastNameElement.textContent).toEqual(driverStandings.lastName);
    expect(constructorElement.textContent).toEqual(driverStandings.constructorName);
    expect(positionElement.value).toEqual(String(driverStandings.position));
    expect(pointsElement.value).toEqual(driverStandings.points);
  });

  it('should call the firebaseService when the submit button is clicked', async () => {
    const spy = jest.fn();
    const driverStandings = createDriverStanding({
      id: 'mocked-id',
      position: 1,
      points: '100',
    });
    const { fixture, debugElement } = arrange({
      firebaseService: {
        writeData: spy,
      },
      host: {
        driver: driverStandings,
      },
    });

    await fixture.whenStable();
    const submitButton = debugElement.query(By.css('[data-test-id="submit"]')).nativeElement;
    submitButton.click();

    expect(spy).toHaveBeenCalledWith({
      id: driverStandings.id,
      points: driverStandings.points,
      position: driverStandings.position,
    });
  });

  it('should call the firebaseService with the correct data after updating the points', async () => {
    const spy = jest.fn();
    const newPoints = '200';
    const driverStandings = createDriverStanding({
      points: '100',
    });
    const { fixture, debugElement } = arrange({
      firebaseService: {
        writeData: spy,
      },
      host: {
        driver: driverStandings,
      },
    });

    await fixture.whenStable();
    const pointsElement = debugElement.query(By.css('[data-test-id="points"]')).nativeElement;
    pointsElement.value = newPoints;
    pointsElement.dispatchEvent(new Event('input'));
    const submitButton = debugElement.query(By.css('[data-test-id="submit"]')).nativeElement;
    submitButton.click();

    expect(spy).toHaveBeenCalledWith({
      id: driverStandings.id,
      points: newPoints,
      position: driverStandings.position,
    });
  });
});
