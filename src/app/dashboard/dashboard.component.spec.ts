import { TestBed, waitForAsync } from '@angular/core/testing';
import DashboardComponent from './dashboard.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { createDriverStanding } from '../driver-standings/utils/fixtures/driver-standing.fixutre';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DriverRowComponent } from './driver-row/driver-row.component';
import { Component, Input } from '@angular/core';

@Component({ standalone: true, selector: 'app-driver-row', template: '' })
class DriverRowStubComponent {
  @Input() isFirst = false;
  @Input() driver = {};
}
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
    }).overrideComponent(DashboardComponent, {
      remove: {
        imports: [DriverRowComponent],
      },
      add: {
        imports: [DriverRowStubComponent],
      },
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

  it('should have a search input', () => {
    const { debugElement } = arrange();
    const searchInput = debugElement.query(By.css('[data-test-id="search-input"]'));
    expect(searchInput).toBeTruthy();
  });

  it('should filter the drivers by firstName in the search input', async () => {
    const driversStandings = [
      createDriverStanding({ firstName: 'lewis' }),
      createDriverStanding({ firstName: 'lando' }),
    ];
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of(driversStandings),
      },
    });

    const searchInput = debugElement.query(By.css('[data-test-id="search-input"]'));
    searchInput.nativeElement.value = driversStandings[0].firstName;
    searchInput.nativeElement.dispatchEvent(new Event('keyup'));

    await fixture.whenStable();
    fixture.detectChanges();

    const driverElements = debugElement.queryAll(By.css('[data-test-id="driver-row"]'));
    expect(driverElements.length).toEqual(1);
    expect(driverElements[0].componentInstance.driver).toEqual(driversStandings[0]);
  });

  it('should filter the drivers by lastName in the search input', async () => {
    const driversStandings = [
      createDriverStanding({ lastName: 'hamilton' }),
      createDriverStanding({ lastName: 'norris' }),
    ];
    const { fixture, debugElement } = arrange({
      firebaseService: {
        getDriverStandings: () => of(driversStandings),
      },
    });

    const searchInput = debugElement.query(By.css('[data-test-id="search-input"]'));
    searchInput.nativeElement.value = driversStandings[0].lastName;
    searchInput.nativeElement.dispatchEvent(new Event('keyup'));

    await fixture.whenStable();
    fixture.detectChanges();

    const driverElements = debugElement.queryAll(By.css('[data-test-id="driver-row"]'));
    expect(driverElements.length).toEqual(1);
    expect(driverElements[0].componentInstance.driver).toEqual(driversStandings[0]);
  });

  it('should have a button to add a new driver', () => {
    const { debugElement } = arrange();
    const addDriverButton = debugElement.query(By.css('[data-test-id="add-driver-button"]'));
    expect(addDriverButton).toBeTruthy();
  });
  it('should call the correct firebase service method when the add driver button is clicked', () => {
    const spy = jest.fn();
    const { debugElement } = arrange({
      firebaseService: {
        addNewDriver: spy,
      },
    });
    const addDriverButton = debugElement.query(By.css('[data-test-id="add-driver-button"]'));
    addDriverButton.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
