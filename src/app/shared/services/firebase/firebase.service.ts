import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { from, map, Observable } from 'rxjs';
import { DriverStanding } from '../../../driver-standings/utils/driver-standing.interface';
import { ConstructorStanding } from '../../../constructor-standings/utils/constructor-standings.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private firebaseConfig = {
    apiKey: 'AIzaSyCXZfmzRTXHzcu0xT-1R6caCRkmjfh8Bpc',
    authDomain: 'f1-standings-c4bd3.firebaseapp.com',
    projectId: 'f1-standings-c4bd3',
    storageBucket: 'f1-standings-c4bd3.appspot.com',
    messagingSenderId: '334080225862',
    appId: '1:334080225862:web:8a973678423c662862d047',
  };

  // Initialize Firebase
  private app = initializeApp(this.firebaseConfig);
  public auth = getAuth(this.app);
  public db = getFirestore(this.app);

  constructor() {
    if (!environment.production) {
      connectAuthEmulator(this.auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(this.db, 'localhost', 8080);
    }
  }
  public getConstructorStandings(): Observable<ConstructorStanding[]> {
    const q = query(collection(this.db, 'constructor-standings'), orderBy('position'));
    return from(getDocs(q)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          return {
            ...(doc.data() as ConstructorStanding),
            id: doc.id,
          };
        })
      )
    );
  }
  public getDriverStandings(): Observable<DriverStanding[]> {
    const q = query(collection(this.db, 'driver-standings'), orderBy('position'));

    return new Observable((subscriber) => {
      const snapUnsub = onSnapshot(q, (next) => {
        subscriber.next(
          next.docs.map((doc) => {
            return {
              ...(doc.data() as DriverStanding),
              id: doc.id,
            };
          })
        );
      });

      subscriber.add(() => {
        snapUnsub();
      });
    });
  }

  public getDriver(id: string): Observable<DriverStanding> {
    const q = doc(this.db, `driver-standings/${id}`);
    return new Observable((subscriber) => {
      const snapUnsub = onSnapshot(q, (doc) => {
        if (!doc.exists()) {
          // Did not find a driver. might want to handle this differently and return null
          subscriber.next({} as DriverStanding);
          return;
        }

        // Convert empty strings to null, might be more useful if we can do this in the backend...
        // Firebase doesn't allow a type to be null or a string. So it seems that a conversion is necessary
        // what I tought of last night is that when there is no data it should just emit the property...
        // obviously that is how it works in a nosql database.
        const f = Object.entries(doc.data()).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: value === '' ? null : value,
          };
        }, {}) as DriverStanding;

        subscriber.next({
          ...f,
          id: doc.id,
        });
      });

      subscriber.add(() => {
        snapUnsub();
      });
    });
  }

  public writeData({
    id,
    points,
    position,
    constructorId,
    constructorName,
    firstName,
    lastName,
    driverNumber,
    driverId,
  }: DriverStanding) {
    position = Number(position);
    const docRef = doc(this.db, 'driver-standings', id);
    updateDoc(docRef, {
      points,
      position,
      constructorId,
      constructorName,
      firstName,
      lastName,
      driverId,
      driverNumber,
    });
  }

  addNewDriver() {
    const colRef = collection(this.db, 'driver-standings');
    const newDoc = doc(colRef);
    setDoc(newDoc, {
      constructorName: '',
      driverId: '',
      constructorId: '',
      firstName: '',
      lastName: '',
      points: '',
      driverNumber: '',
      position: 0,
      id: newDoc.id,
    });
  }
}
