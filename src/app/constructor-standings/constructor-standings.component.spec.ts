import { BehaviorSubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import ConstructorStandingsComponent from './constructor-standings.component';
import { createConstructorStanding } from './utils/fixtures/constructor-standing.fixture';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { OrdinalStubPipe, StandingCardStubComponent } from '../driver-standings/driver-standings.component.spec';

const arrange = (override?: { firebaseService?: Partial<FirebaseService> }) => {
  const stub = {
    firebaseService: {
      getConstructorStandings: jest.fn(),
      ...override?.firebaseService,
    },
  };

  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, ConstructorStandingsComponent],
    providers: [
      {
        provide: FirebaseService,
        useValue: stub.firebaseService,
      },
    ],
  }).overrideComponent(ConstructorStandingsComponent, {
    remove: { imports: [StandingsCardComponent, OrdinalPipe] },
    add: { imports: [StandingCardStubComponent, OrdinalStubPipe] },
  });

  const fixture = TestBed.createComponent(ConstructorStandingsComponent);
  const nativeElement = fixture.nativeElement;
  const componentInstance = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    nativeElement,
    componentInstance,
  };
};

describe('ConstructorStandingsComponent', () => {
  it('should create', () => {
    const { componentInstance } = arrange();

    expect(componentInstance).toBeTruthy();
  });

  it('should call getConstructorStandings on init', () => {
    const getConstructorStandings = jest.fn();
    arrange({
      firebaseService: {
        getConstructorStandings,
      },
    });

    expect(getConstructorStandings).toHaveBeenCalled();
  });

  it('should display entry for each item in interfaces', () => {
    const constructorStandings = [createConstructorStanding(), createConstructorStanding()];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const entries = fixture.debugElement.queryAll(By.css("[data-test-id='constructor-entry']"));

    expect(entries).toHaveLength(constructorStandings.length);
  });

  it('should give correct constructorId', () => {
    const mockedId = 'mockedId';
    const constructorStandings = [createConstructorStanding({ constructorId: mockedId })];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const constructorId = fixture.debugElement.query(By.css("[data-test-id='constructor-entry']")).componentInstance
      .constructorId;
    expect(constructorId).toEqual(mockedId);
  });

  it('should display correct logo based on constructorId', () => {
    const constructorId = 'mockedId';
    const constructorStandings = [createConstructorStanding({ constructorId })];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const constructorLogo = fixture.debugElement.query(By.css('[data-test-id="constructor-logo"]'));
    expect(constructorLogo.attributes['src']).toContain(constructorId);
  });

  it('should display divider with correct class', () => {
    const constructorId = 'mockedId';
    const constructorStandings = [createConstructorStanding({ constructorId })];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const divider = fixture.debugElement.query(By.css("[data-test-id='divider']"));
    expect(divider.classes[constructorId]).toBeTruthy();
  });

  it('should display constructors name', () => {
    const constructorName = 'mockedName';
    const constructorStandings = [createConstructorStanding({ constructorName })];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const constructorNameRef = fixture.debugElement.query(By.css("[data-test-id='constructor-name']"));
    expect(constructorNameRef.nativeElement.innerHTML).toContain(name);
  });

  it('should display constructors position', () => {
    const position = 12;
    const constructorStandings = [createConstructorStanding({ position })];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const constructorPosition = fixture.debugElement.query(By.css("[data-test-id='constructor-position']"));
    expect(constructorPosition.nativeElement.innerHTML).toContain(`fake: ${position}`);
  });

  it('should display constructors points', () => {
    const points = 12;
    const constructorStandings = [createConstructorStanding({ points })];
    const { fixture } = arrange({
      firebaseService: {
        constructorStandings: new BehaviorSubject(constructorStandings),
      },
    });

    const constructorPoints = fixture.debugElement.query(By.css("[data-test-id='constructor-points']"));
    expect(constructorPoints.nativeElement.innerHTML).toContain(String(points));
  });
});
