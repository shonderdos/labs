import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = false;
  private _user = null;

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get user() {
    return this._user;
  }

  public login(user: any) {
    const auth = getAuth();

    console.log(auth);

    this._isAuthenticated = true;
    this._user = user;
  }

  public logout() {
    this._isAuthenticated = false;
    this._user = null;
  }
}
