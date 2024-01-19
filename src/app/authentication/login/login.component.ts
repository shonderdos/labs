import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AsyncPipe, ButtonComponent, InputComponent],
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public loginForm = this.fb.nonNullable.group({
    email: '',
    password: '',
  });

  public error = new BehaviorSubject<unknown>(null);

  public handleSubmit({ email, password }: { email: string; password: string }) {
    this.authService
      .login(email, password)
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
