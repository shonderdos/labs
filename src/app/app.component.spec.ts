import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { createDriverStanding, StandingsService } from './services/standings/standings.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MockPipe } from 'ng-mocks';
import { OrdinalPipe } from './services/pipes/ordinal/ordinal.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const arrange = (override?: { standingService?: Partial<StandingsService> }) => {
  const stub = {
    standingService: {
      standings: of([]),
      ...override?.standingService,
    },
  };

  TestBed.configureTestingModule({
    declarations: [AppComponent, MockPipe(OrdinalPipe, (s) => `fake: ${s}`)],
    imports: [NoopAnimationsModule],
    providers: [{ provide: StandingsService, useValue: stub.standingService }],
  });

  const fixture = TestBed.createComponent(AppComponent);
  const nativeElement = fixture.nativeElement;
  const componentInstance = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    nativeElement,
    componentInstance,
  };
};

describe('AppComponent', () => {
  it('should compile', () => {
    const { componentInstance } = arrange();

    expect(componentInstance).toBeTruthy();
  });

  it('should display a row for each entry', () => {
    const driverStandings = [createDriverStanding(), createDriverStanding()];

    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const entries = fixture.debugElement.queryAll(By.css("[data-test-id='driver-entry']"));

    expect(entries).toHaveLength(driverStandings.length);
  });

  it('should apply correct classname based on constructorsId', () => {
    const mockedId = 'mockedId';
    const driverStandings = [createDriverStanding({ constructorId: mockedId })];

    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const classes = fixture.debugElement.query(By.css("[data-test-id='driver-entry']")).classes;

    expect(classes[mockedId]).toBeTruthy();
  });

  it('should display the first name', () => {
    const firstName = 'Nicholas';
    const driverStandings = [createDriverStanding({ firstName })];
    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-first-name']"));

    expect(name.nativeElement.innerHTML).toContain(firstName);
  });

  it('should display the last name', () => {
    const lastName = 'Latifi';
    const driverStandings = [createDriverStanding({ lastName })];
    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-last-name']"));

    expect(name.nativeElement.innerHTML).toContain(lastName);
  });

  it('should display the points', () => {
    const points = '86';
    const driverStandings = [createDriverStanding({ points })];
    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-points']"));

    expect(name.nativeElement.innerHTML).toContain(points);
  });

  it('should display the position', () => {
    const position = 1;
    const driverStandings = [createDriverStanding({ position })];
    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const name = fixture.debugElement.query(By.css("[data-test-id='driver-position']"));

    expect(name.nativeElement.innerHTML).toContain(`fake: ${position}`);
  });

  it('should display the drivers portrait', () => {
    const driverId = 'mockedDriverId';
    const driverStandings = [createDriverStanding({ driverId })];
    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const image = fixture.debugElement.query(By.css("[data-test-id='driver-portrait']"));
    expect(image.nativeElement.src).toContain(driverId);
  });

  it('should display the drivers number', () => {
    const driverNumber = 'mockedDriverNumber';
    const driverStandings = [createDriverStanding({ driverNumber })];
    const { fixture } = arrange({
      standingService: {
        driverStandings: of(driverStandings),
      },
    });

    const number = fixture.debugElement.query(By.css("[data-test-id='driver-number']"));
    expect(number.nativeElement.innerHTML).toContain(driverNumber);
  });
});
