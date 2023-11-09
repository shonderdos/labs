import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { defer, from, map, Observable } from 'rxjs';
import { DriverStanding } from '../../../driver-standings/utils/driver-standing.interface';
import { ConstructorStanding } from '../../../constructor-standings/utils/constructor-standings.interface';

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
  private auth = getAuth(this.app);
  public db = getFirestore(this.app);

  public getConstructorStandings(): Observable<ConstructorStanding[]> {
    const q = query(collection(this.db, 'constructor-standings'), orderBy('position'));
    return from(getDocs(q)).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() as ConstructorStanding))
    );
  }
  public getDriverStandings(): Observable<DriverStanding[]> {
    const q = query(collection(this.db, 'driver-standings'), orderBy('position'));
    return from(getDocs(q)).pipe(map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() as DriverStanding)));
  }
  public login(email: string, password: string) {
    return defer(() => from(signInWithEmailAndPassword(this.auth, email, password)));
  }
}
