import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  public email = this.loginForm.get('email') as FormControl;
  public password = this.loginForm.get('password') as FormControl;
  public error = new BehaviorSubject<unknown>(null);

  public handleSubmit() {
    this.authService
      .login(this.email.value as string, this.password.value as string)
      .pipe(
        tap(() => {
          this.router.navigate(['/dashboard'], { queryParamsHandling: 'preserve' });
        }),
        catchError((err) => {
          this.error.next(err);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
