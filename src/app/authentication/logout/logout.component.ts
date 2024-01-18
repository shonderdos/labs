import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-logout',
  template: '',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LogoutComponent {
  private firebaseService = inject(FirebaseService);

  private router = inject(Router);
  constructor() {
    this.firebaseService.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
