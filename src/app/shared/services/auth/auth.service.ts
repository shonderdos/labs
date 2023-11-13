import { inject, Injectable } from '@angular/core';
import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { defer, from, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public state = new ReplaySubject<User | null>(1);
  private auth = inject(FirebaseService).auth;

  constructor() {
    onAuthStateChanged(this.auth, this.state.next.bind(this.state));
  }

  public login(email: string, password: string) {
    return defer(() => from(signInWithEmailAndPassword(this.auth, email, password)));
  }
}
