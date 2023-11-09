import { TestBed } from '@angular/core/testing';
import LoginComponent from './login.component';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  function arrange({
    firebaseService,
    authService,
    router,
  }: {
    firebaseService?: object;
    authService?: object;
    router?: object;
  } = {}) {
    const firebaseServiceStub = {
      login: () => of({}),
      ...firebaseService,
    };
    const authServiceStub = {
      login: () => {},
      ...authService,
    };
    const routerStub = {
      navigate: () => {},
      ...router,
    };
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    });

    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    fixture.detectChanges();

    return { component, fixture, debugElement };
  }
  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });

  it('should not show a error message when loading the page', () => {
    const { debugElement } = arrange();
    const error = debugElement.query(By.css('[data-test-id="error"]'));
    expect(error).toBeFalsy();
  });

  it('should show a error message when login fails', () => {
    const { fixture, debugElement } = arrange({
      firebaseService: {
        login: () => {
          return throwError(() => 'error');
        },
      },
    });
    const submitEl = debugElement.query(By.css('[data-test-id="submit"]'));

    submitEl.triggerEventHandler('click');
    fixture.detectChanges();

    const error = debugElement.query(By.css('[data-test-id="error"]'));
    expect(error).toBeTruthy();
  });

  it('should call the login method on the firebaseService when the submit button is clicked', () => {
    const spy = jest.fn(() => of({}));
    const email = 'email';
    const password = 'password';
    const { fixture, debugElement } = arrange({
      firebaseService: {
        login: spy,
      },
    });
    const submitEl = debugElement.query(By.css('[data-test-id="submit"]'));
    const emailEl = debugElement.query(By.css('[data-test-id="email"]'));
    const passwordEl = debugElement.query(By.css('[data-test-id="password"]'));

    emailEl.nativeElement.value = email;
    passwordEl.nativeElement.value = password;
    fixture.whenStable().then(() => {
      submitEl.triggerEventHandler('click');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(email, password);
    });
  });

  it('should call the login method on the authService when the submit button is clicked', () => {
    const spy = jest.fn(() => of({}));
    const mock = 'mock';
    const { debugElement } = arrange({
      firebaseService: {
        login: () => of(mock),
      },
      authService: {
        login: spy,
      },
    });
    const submitEl = debugElement.query(By.css('[data-test-id="submit"]'));

    submitEl.triggerEventHandler('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mock);
  });

  it('should navigate to the dashboard when the submit button is clicked', () => {
    const spy = jest.fn();
    const { debugElement } = arrange({
      firebaseService: {
        login: () => of({}),
      },
      router: {
        navigate: spy,
      },
    });
    const submitEl = debugElement.query(By.css('[data-test-id="submit"]'));
    submitEl.triggerEventHandler('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
  });
});
