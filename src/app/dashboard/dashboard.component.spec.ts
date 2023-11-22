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

  it('should have a app page wrapper with the correct header', () => {
    const { debugElement } = arrange();
    const pageWrapper = debugElement.query(By.css('[data-test-id="page-wrapper"]'));

    expect(pageWrapper).toBeTruthy();
    expect(pageWrapper.attributes['heading']).toEqual('Manage drivers');
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

  it('should render a row element for each driver', async () => {
    const driversStandings = [createDriverStanding(), createDriverStanding(), createDriverStanding()];
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of(driversStandings),
      },
    });

    await fixture.whenStable();
    const driverElements = debugElement.queryAll(By.css('[data-test-id="driver-row"]'));
    expect(driverElements.length).toEqual(driversStandings.length);
  });

  it('should pass the correct properties to the driver-row component', async () => {
    const driversStandings = [createDriverStanding(), createDriverStanding(), createDriverStanding()];
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of(driversStandings),
      },
    });

    await fixture.whenStable();

    const driverElements = debugElement.queryAll(By.css('[data-test-id="driver-row"]'));
    expect(driverElements.length).toEqual(driversStandings.length);
    driverElements.forEach((driverElement, index) => {
      const driver = driversStandings[index];
      const driverRowComponent = driverElement.componentInstance;
      expect(driverRowComponent.driver).toEqual(driver);
    });
  });
});
