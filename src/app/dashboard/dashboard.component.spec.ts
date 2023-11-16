import { TestBed, waitForAsync } from '@angular/core/testing';
import DashboardComponent from './dashboard.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { createDriverStanding } from '../driver-standings/utils/fixtures/driver-standing.fixutre';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  function arrange({ firebaseService }: { firebaseService?: Partial<FirebaseService> } = {}) {
    const stub = {
      firebaseService: {
        getDriverStandings: () => {},
        ...firebaseService,
      },
    };
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: stub.firebaseService,
        },
      ],
    });

    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;

    fixture.detectChanges();

    return {
      fixture,
      component,
      debugElement,
    };
  }
  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });

  it('should have a list of drivers', () => {
    const { component } = arrange();
    expect(component.drivers).toBeTruthy();
  });

  it('should get a list of driver from the firebaseService', waitForAsync(() => {
    const driversStandings = [createDriverStanding(), createDriverStanding(), createDriverStanding()];
    const { component } = arrange({
      firebaseService: {
        getDriverStandings: () => of(driversStandings),
      },
    });

    component.drivers.subscribe((drivers) => {
      expect(drivers).toEqual(driversStandings);
    });
  }));

  it('should should display each driver on the page', () => {
    const driversStandings = [createDriverStanding(), createDriverStanding(), createDriverStanding()];
    const { debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of(driversStandings),
      },
    });

    const driverElements = debugElement.queryAll(By.css('[data-test-id="driver-row"]'));
    expect(driverElements.length).toEqual(driversStandings.length);
  });

  it('should have all the elements for each driver', () => {
    const driverStandings = createDriverStanding({
      firstName: 'Lewis',
      lastName: 'Hamilton',
      constructorName: 'Mercedes',
      position: 1,
      points: '100',
    });
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of([driverStandings]),
      },
    });

    fixture.whenStable().then(() => {
      const firstNameElement = debugElement.query(By.css('[data-test-id="first-name"]')).nativeElement;
      const lastNameElement = debugElement.query(By.css('[data-test-id="last-name"]')).nativeElement;
      const constructorElement = debugElement.query(By.css('[data-test-id="constructor-name"]')).nativeElement;
      const positionElement = debugElement.query(By.css('[data-test-id="position"]')).nativeElement;
      const pointsElement = debugElement.query(By.css('[data-test-id="points"]')).nativeElement;

      expect(firstNameElement.textContent).toEqual(driverStandings.firstName);
      expect(lastNameElement.textContent).toEqual(driverStandings.lastName);
      expect(constructorElement.textContent).toEqual(driverStandings.constructorName);
      expect(positionElement.value).toEqual(driverStandings.position);
      expect(pointsElement.value).toEqual(driverStandings.points);
    });
  });

  it('should call the firebaseService when the submit button is clicked', () => {
    const spy = jest.fn();
    const driverStandings = createDriverStanding({
      id: 'mocked-id',
      position: 1,
      points: '100',
    });
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of([driverStandings]),
        writeData: spy,
      },
    });

    fixture.whenStable().then(() => {
      const submitButton = debugElement.query(By.css('[data-test-id="submit"]')).nativeElement;
      submitButton.click();

      expect(spy).toHaveBeenCalledWith({
        id: driverStandings.id,
        points: driverStandings.points,
        position: driverStandings.position,
      });
    });
  });

  it('should call the firebaseService with the correct data after updating the points', () => {
    const spy = jest.fn();
    const newPoints = '200';
    const driverStandings = createDriverStanding({
      points: '100',
    });
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of([driverStandings]),
        writeData: spy,
      },
    });

    fixture.whenStable().then(() => {
      const pointsElement = debugElement.query(By.css('[data-test-id="points"]')).nativeElement;
      pointsElement.value = newPoints;
      pointsElement.dispatchEvent(new Event('input'));

      expect(spy).toHaveBeenCalledWith({
        id: driverStandings.id,
        points: newPoints,
        position: driverStandings.position,
      });
    });
  });
});
