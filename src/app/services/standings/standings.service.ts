import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstructorsEntity, ConstructorStandingEntity, DTOErgast } from './standings.interface';

export interface DriverStanding {
  firstName: string;
  lastName: string;
  driverId: string;
  constructorName: string;
  constructorId: string;
  points: string;
  position: number;
  driverNumber: string;
}

export const createDriverStanding = (override?: Partial<DriverStanding>): DriverStanding => {
  return {
    constructorName: 'Williams',
    driverId: 'latifi',
    constructorId: 'williams',
    firstName: 'Nicholas',
    lastName: 'Latifi',
    points: '86',
    driverNumber: '6',
    position: 1,
    ...override,
  };
};

export const createConstructor = (override?: Partial<ConstructorsEntity>): ConstructorsEntity => {
  return {
    constructorId: 'williams',
    url: 'http://fake-url.com',
    name: 'Williams',
    nationality: 'British',
    ...override,
  };
};

export const createConstructorStanding = (override?: Partial<ConstructorStandingEntity>): ConstructorStandingEntity => {
  return {
    position: '1',
    positionText: '1',
    points: '86',
    wins: '12',
    Constructor: createConstructor(override?.Constructor),
    ...override,
  };
};

@Injectable({ providedIn: 'root' })
export class StandingsService {
  private hostName = 'https://ergast.com/api/';
  private series = 'f1';
  private baseUrl = `${this.hostName}${this.series}/`;

  constructor(private http: HttpClient) {}

  public driverStandings: Observable<DriverStanding[]> = this.http
    .get<DTOErgast>(`${this.baseUrl}current/driverStandings.json`)
    .pipe(
      map((dto) => dto.MRData.StandingsTable.StandingsLists[0].DriverStandings),
      map((driverStandings) =>
        driverStandings.map((driverStanding) => {
          return {
            firstName: driverStanding.Driver.givenName,
            lastName: driverStanding.Driver.familyName,
            constructorName: driverStanding.Constructors[0].name,
            constructorId: driverStanding.Constructors[0].constructorId,
            driverId: driverStanding.Driver.driverId,
            points: driverStanding.points,
            position: Number(driverStanding.position),
            driverNumber: driverStanding.Driver.permanentNumber,
          };
        })
      )
    );

  public constructorStandings: Observable<ConstructorStandingEntity[]> = this.http
    .get<DTOErgast>(`${this.baseUrl}current/constructorStandings.json`)
    .pipe(map((dto) => dto.MRData.StandingsTable.StandingsLists[0].ConstructorStandings));
}
