import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { createDriverStanding, StandingsService } from './standings.service';

const createConstructor = () => {
  return {
    constructorId: 'williams',
    url: 'http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering',
    name: 'Williams',
    nationality: 'British',
  };
};

const createDriver = () => {
  return {
    driverId: 'latifi',
    permanentNumber: '6',
    code: 'LAT',
    url: 'http://en.wikipedia.org/wiki/Nicholas_Latifi',
    givenName: 'Nicholas',
    familyName: 'Latifi',
    dateOfBirth: '1995-06-29',
    nationality: 'Canadian',
  };
};

const createDTODriverStanding = () => {
  return {
    position: '1',
    positionText: '1',
    points: '86',
    wins: '2',
    Driver: createDriver(),
    Constructors: [createConstructor()],
  };
};

const mockResponse = {
  MRData: {
    xmlns: 'http://ergast.com/mrd/1.5',
    series: 'f1',
    url: 'http://ergast.com/api/f1/current/driverstandings.json',
    limit: '30',
    offset: '0',
    total: '21',
    StandingsTable: {
      season: '2022',
      StandingsLists: [
        {
          season: '2022',
          round: '4',
          DriverStandings: [createDTODriverStanding()],
        },
      ],
    },
  },
};

const arrange = () => {
  TestBed.configureTestingModule({
    providers: [StandingsService],
    imports: [HttpClientTestingModule],
  });

  const httpTestingController = TestBed.inject(HttpTestingController);
  const service = TestBed.inject(StandingsService);

  return {
    httpTestingController,
    service,
  };
};

describe('StandingsService', () => {
  it('should map response correct', (done) => {
    const { httpTestingController, service } = arrange();
    service.driverStandings.subscribe((res) => {
      expect(res).toEqual([createDriverStanding()]);
      done();
    });

    const req = httpTestingController.expectOne('https://ergast.com/api/f1/current/driverStandings.json');
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
    httpTestingController.verify();
  });
});
