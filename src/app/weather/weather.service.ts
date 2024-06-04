import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { collection, limit, onSnapshot, query } from 'firebase/firestore';

export interface EnvironmentMeasurementConfig {
  title: string;
  icon: string;
  current_value: number;
  previous_value: number;
  unit: string;
}
export interface Weathers {
  wind_speed: EnvironmentMeasurementConfig;
  temperature: EnvironmentMeasurementConfig;
  chance_of_rain: EnvironmentMeasurementConfig;
  uv_index: EnvironmentMeasurementConfig;
  sunset: EnvironmentMeasurementConfig;
}
@Injectable({ providedIn: 'root' })
export class WeatherService {
  #db = inject(FirebaseService).db;

  ref = collection(this.#db, 'weather');
  #query = query(this.ref, limit(1));
  //TODO: type out weather interface
  weather = new Observable<Weathers>((subscriber) => {
    const unsubscribe = onSnapshot(this.#query, (doc) => {
      const intermediary = doc.docs[0].data() as Weathers;
      subscriber.next(intermediary);
    });

    subscriber.add(unsubscribe);
  });
}
