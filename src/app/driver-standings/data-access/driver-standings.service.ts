import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DTOErgast } from '../../shared/interfaces/standings.interface';
import { DriverStanding } from '../utils/driver-standing.interface';

@Injectable({ providedIn: 'root' })
export class DriverStandingsService {
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
}
