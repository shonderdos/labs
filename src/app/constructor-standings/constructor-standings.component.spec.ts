import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { OrdinalPipe } from '../shared/pipes/ordinal/ordinal.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ConstructorStandingsComponent } from './constructor-standings.component';
import { ContrsuctorStandingsService } from './data-access/constructor-standings.service';
import { createConstructor } from './utils/fixtures/constructor.fixture';
import { createConstructorStanding } from './utils/fixtures/constructor-standing.fixture';
import { StandingsCardComponent } from '../shared/ui/standings-card/standings-card.component';

const arrange = (override?: { standingService?: Partial<ContrsuctorStandingsService> }) => {
  const stub = {
    standingService: {
      ...override?.standingService,
    },
  };

  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, ConstructorStandingsComponent],
    providers: [
      {
        provide: ContrsuctorStandingsService,
        useValue: stub.standingService,
      },
    ],
  }).overrideComponent(ConstructorStandingsComponent, {
    add: { imports: [StandingsCardComponent, MockPipe(OrdinalPipe, (s) => `fake: ${s}`)] },
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

  it('should display entry for each item in interfaces', () => {
    const constructorStandings = [createConstructorStanding(), createConstructorStanding()];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const entries = fixture.debugElement.queryAll(By.css("[data-test-id='constructor-entry']"));

    expect(entries).toHaveLength(constructorStandings.length);
  });

  it('should give correct constructorId', () => {
    const mockedId = 'mockedId';
    const constructorStandings = [
      createConstructorStanding({ Constructor: createConstructor({ constructorId: mockedId }) }),
    ];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const constructorId = fixture.debugElement.query(By.css("[data-test-id='constructor-entry']")).componentInstance
      .constructorId;
    expect(constructorId).toEqual(mockedId);
  });

  it('should display correct logo based on constructorId', () => {
    const constructorId = 'mockedId';
    const constructorStandings = [createConstructorStanding({ Constructor: createConstructor({ constructorId }) })];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const constructorLogo = fixture.debugElement.query(By.css('[data-test-id="constructor-logo"]'));
    expect(constructorLogo.attributes['src']).toContain(constructorId);
  });

  it('should display divider with correct class', () => {
    const constructorId = 'mockedId';
    const constructorStandings = [createConstructorStanding({ Constructor: createConstructor({ constructorId }) })];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const divider = fixture.debugElement.query(By.css("[data-test-id='divider']"));
    expect(divider.classes[constructorId]).toBeTruthy();
  });

  it('should display constructors name', () => {
    const name = 'mockedName';
    const constructorStandings = [createConstructorStanding({ Constructor: createConstructor({ name }) })];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const constructorName = fixture.debugElement.query(By.css("[data-test-id='constructor-name']"));
    expect(constructorName.nativeElement.innerHTML).toContain(name);
  });

  it('should display constructors position', () => {
    const position = '12';
    const constructorStandings = [createConstructorStanding({ position })];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const constructorPosition = fixture.debugElement.query(By.css("[data-test-id='constructor-position']"));
    expect(constructorPosition.nativeElement.innerHTML).toContain(`fake: ${position}`);
  });

  it('should display constructors points', () => {
    const points = '12';
    const constructorStandings = [createConstructorStanding({ points })];
    const { fixture } = arrange({
      standingService: {
        constructorStandings: of(constructorStandings),
      },
    });

    const constructorPoints = fixture.debugElement.query(By.css("[data-test-id='constructor-points']"));
    expect(constructorPoints.nativeElement.innerHTML).toContain(points);
  });
});
