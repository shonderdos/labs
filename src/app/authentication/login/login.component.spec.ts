import { TestBed } from '@angular/core/testing';
import LoginComponent from './login.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { UserCredential } from '@firebase/auth';

describe('LoginComponent', () => {
  function arrange({
    authService,
    router,
  }: {
    authService?: Partial<AuthService>;
    router?: Partial<Router>;
  } = {}) {
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
      authService: {
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

  it('should call the login method on the authService when the submit button is clicked', async () => {
    const spy = jest.fn(() => of({} as UserCredential));
    const email = 'email';
    const password = 'password';
    const { fixture, debugElement } = arrange({
      authService: {
        login: spy,
      },
    });
    const submitEl = debugElement.query(By.css('[data-test-id="submit"]'));
    const emailEl = debugElement.query(By.css('[data-test-id="email"]'));
    const passwordEl = debugElement.query(By.css('[data-test-id="password"]'));

    emailEl.nativeElement.value = email;
    passwordEl.nativeElement.value = password;
    emailEl.nativeElement.dispatchEvent(new Event('input'));
    passwordEl.nativeElement.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    submitEl.triggerEventHandler('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it('should navigate to the dashboard when the submit button is clicked', () => {
    const spy = jest.fn();
    const { debugElement } = arrange({
      authService: {
        login: () => of({} as UserCredential),
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
