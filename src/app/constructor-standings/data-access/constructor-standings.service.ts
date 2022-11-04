import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ConstructorStandingEntity, DTOErgast } from '../../shared/interfaces/standings.interface';

@Injectable({ providedIn: 'root' })
export class ContrsuctorStandingsService {
  private hostName = 'https://ergast.com/api/';
  private series = 'f1';
  private baseUrl = `${this.hostName}${this.series}/`;

  constructor(private http: HttpClient) {}

  public constructorStandings: Observable<ConstructorStandingEntity[]> = this.http
    .get<DTOErgast>(`${this.baseUrl}current/constructorStandings.json`)
    .pipe(map((dto) => dto.MRData.StandingsTable.StandingsLists[0].ConstructorStandings));
}
