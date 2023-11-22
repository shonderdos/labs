import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDocs,
  getFirestore,
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
    return from(getDocs(q)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          return {
            ...(doc.data() as DriverStanding),
            id: doc.id,
          };
        })
      )
    );
  }

  public writeData({
    id,
    points,
    position,
  }: {
    id: DriverStanding['id'];
    points: DriverStanding['points'];
    position: DriverStanding['position'];
  }) {
    const docRef = doc(this.db, 'driver-standings', id);
    updateDoc(docRef, { points, position });
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
