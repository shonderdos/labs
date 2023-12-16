import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { FirebaseService } from '../firebase/firebase.service';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

describe('AuthService', () => {
  const arrange = () => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: FirebaseService, useValue: { auth: {} } }],
    });
    const service = TestBed.inject(AuthService);
    return { service };
  };
  it('should be created', () => {
    const { service } = arrange();
    expect(service).toBeTruthy();
  });

  it('should call onAuthStateChanged', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onAuthStateChanged.mockClear();

    arrange();

    expect(onAuthStateChanged).toHaveBeenCalled();
  });

  it('login should return a observable', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    signInWithEmailAndPassword.mockClear();

    const { service } = arrange();
    const result = service.login('', '');

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    expect(result.subscribe).toBeDefined();
  });

  it('login should call signInWithEmailAndPassword after subscription', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    signInWithEmailAndPassword.mockClear();

    const { service } = arrange();
    const result = service.login('', '');

    result.subscribe();

    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('login should call signInWithEmailAndPassword with correct arguments', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    signInWithEmailAndPassword.mockClear();

    const { service } = arrange();

    const result = service.login('', '');
    result.subscribe();

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, '', '');
  });
});
