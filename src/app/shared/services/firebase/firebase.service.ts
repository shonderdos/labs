import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  Firestore,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';
import { connectAuthEmulator, getAuth, signOut } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { DriverStanding } from '../../interfaces/driver-standing.interface';
import { environment } from '../../../../environments/environment';
import { Team } from 'src/app/teams/teams.component';
import { Event } from 'src/app/events/events-edit/events-edit.component';

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
export interface Championship {
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

  #newDocument = newDocumentBuilder(this.db);
  #getAllDocuments = getAllDocumentsBuilder(this.db);
  #getSingleDocument = getSingleDocumentBuilder(this.db);
  #deleteDocument = deleteDocumentBuilder(this.db);
  #updateDocument = updateDocumentBuilder(this.db);

  constructor() {
    if (!environment.production) {
      connectAuthEmulator(this.auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(this.db, 'localhost', 8080);
    }
  }
  public getDriverStandings(): Observable<DriverStanding[]> {
    return this.#getAllDocuments('driver-standings');
  }

  public logout() {
    // handle errors
    return signOut(this.auth);
  }

  public getDriver(id: string): Observable<DriverStanding> {
    return this.#getSingleDocument<DriverStanding>('driver-standings', id).pipe(map(([driver]) => driver));
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
    return this.#newDocument('driver-standings');
  }

  deleteDriver(id: DriverStanding['id']) {
    if (!id) {
      return;
    }

    this.#deleteDocument(`driver-standings/${id}`);
  }

  searchDrivers<T = DriverStanding>(
    searchValue: string,
    maxResults = 5
  ): Observable<{ results: T[]; searchValue: string }> {
    const colRef = collection(this.db, 'driver-standings');
    const q = query(colRef, orderBy('firstName'), limit(maxResults), startAt(searchValue));
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(q, (docs) => {
        const results: T[] = [];
        docs.forEach((result) => results.push(result.data() as T));
        subscriber.next({ results, searchValue });
      });

      subscriber.add(unsubscribe);
    });
  }

  addTrack() {
    return this.#newDocument('tracks');
  }

  deleteTrack(id: string) {
    if (!id) {
      throw new Error('Failed to delete track. No id provided');
    }

    console.log(id);
    this.#deleteDocument(`tracks/${id}`);
  }

  updateTrack(id: string, formData: Partial<Track>) {
    if (!id) {
      console.error('Failed to update track. No id provided');
    }

    const data = {
      lat: formData.lat,
      lon: formData.lon,
      name: formData.name,
    };

    this.#updateDocument(`tracks/${id}`, data);
  }

  getTrack(id?: string): Observable<Track[]> {
    return id ? this.#getSingleDocument('tracks', id) : this.#getAllDocuments('tracks');
  }

  getTrackConfiguration(trackId: Track['id']) {
    if (!trackId) {
      throw new Error('No trackid provided ');
    }
    return this.#getAllDocuments<TrackConfiguration>(`tracks/${trackId}/configurations`);
  }

  addConfiguration(trackId: Track['id']) {
    return this.#newDocument<Partial<TrackConfiguration>>(`tracks/${trackId}/configurations`, { name: '' });
  }
  updateTrackConfiguration(trackId: Track['id'], trackConfiguration: TrackConfiguration) {
    if (!trackId) {
      throw new Error('No trackid provided');
    }

    if (!trackConfiguration) {
      throw new Error('no track configuration provided');
    }

    this.#updateDocument(`tracks/${trackId}/configurations/${trackConfiguration.id}`, trackConfiguration);
  }

  deleteTrackConfiguration(trackId: Track['id'], trackConfigurationId: TrackConfiguration['id']) {
    if (!trackId) {
      throw new Error('No track if provided');
    }
    if (!trackConfigurationId) {
      throw new Error('No Track Configuration provided');
    }

    this.#deleteDocument(`tracks/${trackId}/configurations/${trackConfigurationId}`);
  }

  addTeam() {
    return this.#newDocument<Omit<Team, 'id'>>('teams', { name: '' });
  }

  getTeam(teamId?: Team['id']) {
    return teamId ? this.#getSingleDocument<Team>('teams', teamId) : this.#getAllDocuments<Team>('teams');
  }

  deleteTeam(teamId: Team['id']) {
    if (!teamId) throw new Error('deleting team failed. No team id provided');
    this.#deleteDocument(`teams/${teamId}`);
  }

  updateTeam(teamId: Team['id'], data: Partial<Team>) {
    if (!teamId) throw new Error('No team id provided');
    this.#updateDocument(`teams/${teamId}`, data);
  }

  getTeamMembers(id: Team['id']) {
    if (!id) throw new Error('No team id provided');
    return this.#getAllDocuments<DriverStanding>(`teams/${id}/members`);
  }
  addTeamMember(id: Team['id'], user: DriverStanding) {
    if (!id) throw new Error('No team id provided');
    if (!user) throw new Error('No member provided');

    this.#newDocument(`teams/${id}/members/${user.id}`, user);
  }

  deleteTeamMember(teamId: Team['id'], userId: DriverStanding['id']) {
    if (!teamId) throw new Error('No team id provided');
    if (!userId) throw new Error('No member provided');

    this.#deleteDocument(`teams/${teamId}/members/${userId}`);
  }

  addChampionship() {
    return this.#newDocument<Omit<Championship, 'id'>>('championships', { name: '' });
  }

  deleteChampionship(id: Championship['id']) {
    if (!id) throw new Error('id not provided');

    this.#deleteDocument(`championships/${id}`);
  }

  getChampionship(id?: Championship['id']) {
    return id
      ? this.#getSingleDocument<Championship>('championships', id)
      : this.#getAllDocuments<Championship>('championships');
  }

  updateChampionship(id: Championship['id'], data: Partial<Championship>) {
    if (!id) throw new Error('id not provided');

    this.#updateDocument(`championships/${id}`, data);
  }

  addEvent() {
    return this.#newDocument<Omit<Event, 'id'>>('events', { date: '', track: {} as Track });
  }

  deleteEvent(id: Event['id']) {
    if (!id) throw new Error('id not provided');

    this.#deleteDocument(`events/${id}`);
  }

  getEvent(id?: Event['id']) {
    return id ? this.#getSingleDocument<Event>('events', id) : this.#getAllDocuments<Event>('events');
  }
  updateEvent(id: Event['id'], data: Partial<Event>) {
    if (!id) throw new Error('id not provided');

    this.#updateDocument(`events/${id}`, data);
  }
}

export const newDocumentBuilder =
  (database: Firestore) =>
  <T>(path: string, defaultData?: T): string => {
    const segments = path.split('/').length;
    if (segments % 2) {
      const colRef = collection(database, path);
      const docRef = doc(colRef);
      const { id } = docRef;
      setDoc(docRef, { ...defaultData, id });
      return id;
    } else {
      const docRef = doc(database, path);
      setDoc(docRef, { ...defaultData });
      return docRef.id;
    }
  };

export const getSingleDocumentBuilder =
  (database: Firestore) =>
  <T>(path: string, id: string): Observable<T[]> => {
    const docRef = query(collection(database, path), where('id', '==', id));
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(docRef, (docs) => {
        const result = [] as T[];
        docs.forEach((doc) => result.push(doc.data() as T));
        subscriber.next(result);
      });
      subscriber.add(unsubscribe);
    });
  };

export const getAllDocumentsBuilder =
  (database: Firestore) =>
  <T>(path: string): Observable<T[]> => {
    const colRef = collection(database, path);
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(colRef, (docs) => {
        const results: T[] = [];
        docs.forEach((result) => results.push(result.data() as T));
        subscriber.next(results);
      });

      subscriber.add(unsubscribe);
    });
  };
export const deleteDocumentBuilder =
  (database: Firestore) =>
  (path: string): void => {
    const docRef = doc(database, path);
    deleteDoc(docRef);
  };

export const updateDocumentBuilder =
  (database: Firestore) =>
  <T>(path: string, data: Partial<T>) => {
    const docRef = doc(database, path);
    updateDoc(docRef, data);
  };
