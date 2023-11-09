import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AsyncPipe],
})
export default class LoginComponent {
  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  public email = this.loginForm.get('email') as FormControl;
  public password = this.loginForm.get('password') as FormControl;
  public error = new BehaviorSubject<unknown>(null);

  public handleSubmit() {
    this.firebaseService
      .login(this.email.value as string, this.password.value as string)
      .pipe(
        tap((res) => {
          this.authService.login(res);
        }),
        tap(() => {
          this.router.navigate(['/dashboard']);
        }),
        catchError((err) => {
          this.error.next(err);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
