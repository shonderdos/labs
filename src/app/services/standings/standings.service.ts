import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DTOStandings } from './standings.interface';

export interface DriverStanding {
  firstName: string;
  lastName: string;
  constructorName: string;
  constructorId: string;
  points: string;
  position: number;
}

export const createDriverStanding = (override?: Partial<DriverStanding>): DriverStanding => {
  return {
    constructorName: 'Williams',
    constructorId: 'williams',
    firstName: 'Nicholas',
    lastName: 'Latifi',
    points: '86',
    position: 1,
    ...override,
  };
};

@Injectable({ providedIn: 'root' })
export class StandingsService {
  constructor(private http: HttpClient) {}

  public driverStandings: Observable<DriverStanding[]> = this.http
    .get<DTOStandings>('https://ergast.com/api/f1/current/driverStandings.json')
    .pipe(
      map((dto) => dto.MRData.StandingsTable.StandingsLists[0].DriverStandings),
      map((driverStandings) =>
        driverStandings.map((driverStanding) => {
          return {
            firstName: driverStanding.Driver.givenName,
            lastName: driverStanding.Driver.familyName,
            constructorName: driverStanding.Constructors[0].name,
            constructorId: driverStanding.Constructors[0].constructorId,
            points: driverStanding.points,
            position: Number(driverStanding.position),
          };
        })
      )
    );
}
