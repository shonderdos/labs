import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { connectAuthEmulator, getAuth, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DriverStanding } from '../../interfaces/driver-standing.interface';
import { environment } from '../../../../environments/environment';

export interface Track {
  name: string;
  id: string;
  lat: string;
  lon: string;
}
export interface TrackConfiguration {
  name: string;
  id: string;
}
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
  public getDriverStandings(): Observable<DriverStanding[]> {
    const q = query(collection(this.db, 'driver-standings'));

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

  public logout() {
    // handle errors
    return signOut(this.auth);
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

        subscriber.next({
          ...doc.data(),
          id: doc.id,
        });
      });

      subscriber.add(snapUnsub);
    });
  }

  public writeData(formData: DriverStanding) {
    if (!formData.id) {
      return;
    }
    const docRef = doc(this.db, 'driver-standings', formData.id);
    // @ts-expect-error - I don't know how to fix this
    updateDoc(docRef, formData);
  }

  public addNewDriver() {
    const colRef = collection(this.db, 'driver-standings');
    const newDoc = doc(colRef);
    const { id } = newDoc;
    setDoc(newDoc, { id });
    return id;
  }

  deleteDriver(id: DriverStanding['id']) {
    if (!id) {
      return;
    }
    const colRef = collection(this.db, 'driver-standings');
    const docRef = doc(colRef, id);
    deleteDoc(docRef);
  }

  addTrack() {
    const colRef = collection(this.db, 'tracks');
    const docRef = doc(colRef);
    const { id } = docRef;
    setDoc(docRef, { id });

    return id;
  }

  deleteTrack(id: string) {
    if (!id) {
      console.error('Failed to delete track. No id provided');
      return;
    }

    const docRef = doc(this.db, 'tracks', id);

    deleteDoc(docRef);
  }

  async updateTrack(id: string, formData: Partial<Track>, merge = true) {
    if (!id) {
      console.error('Failed to update track. No id provided');
    }

    const data = {
      lat: formData.lat,
      lon: formData.lon,
      name: formData.name,
    };

    const docRef = doc(this.db, 'tracks', id);

    await setDoc(docRef, data, { merge });
  }

  getTrack(id?: string): Observable<Track[]> {
    if (id) {
      const docRef = query(collection(this.db, 'tracks'), where('id', '==', id));
      return new Observable((subscriber) => {
        const unsubscribe = onSnapshot(docRef, (doc) => {
          doc.forEach((doc) => subscriber.next([doc.data() as Track]));
        });
        subscriber.add(unsubscribe);
      });
    }

    const colRef = collection(this.db, 'tracks');
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(colRef, (docs) => {
        const tracks: Track[] = [];
        docs.forEach((track) => tracks.push(track.data() as Track));
        subscriber.next(tracks);
      });

      subscriber.add(unsubscribe);
    });
  }

  getTrackConfiguration(trackId: Track['id']) {
    if (!trackId) {
      throw new Error('No trackid provided ');
    }
    const colRef = collection(this.db, 'tracks', trackId, 'configurations');
    return new Observable<TrackConfiguration[]>((subscriber) => {
      const unsubscribe = onSnapshot(colRef, (docs) => {
        const tracks: TrackConfiguration[] = [];
        docs.forEach((track) => tracks.push(track.data() as TrackConfiguration));
        subscriber.next(tracks);
      });

      subscriber.add(unsubscribe);
    });
  }

  addConfiguration(trackId: Track['id']) {
    const colRef = collection(this.db, 'tracks', trackId, 'configurations');
    const docRef = doc(colRef);
    const { id } = docRef;
    setDoc(docRef, { id, name: '' });

    return id;
  }
  updateTrackConfiguration(trackId: Track['id'], trackConfiguration: TrackConfiguration, merge = true) {
    if (!trackId) {
      throw new Error('No trackid provided');
    }

    if (!trackConfiguration) {
      throw new Error('no track configuration provided');
    }

    const docRef = doc(this.db, 'tracks', trackId, 'configurations', trackConfiguration.id);

    setDoc(docRef, trackConfiguration, { merge });
  }

  deleteTrackConfiguration(trackId: Track['id'], trackConfigurationId: TrackConfiguration['id']) {
    if (!trackId) {
      throw new Error('No track if provided');
    }
    if (!trackConfigurationId) {
      throw new Error('No Track Configuration provided');
    }

    const docRef = doc(this.db, 'tracks', trackId, 'configurations', trackConfigurationId);
    deleteDoc(docRef);
  }
}
