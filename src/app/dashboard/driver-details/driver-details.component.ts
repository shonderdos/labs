import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { map, switchMap } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, AsyncPipe],
})
export default class DriverDetailsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  public driver = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.firebaseService.getDriver(id)),
    map((driver) => {
      return Object.entries(driver);
    })
  );
  public closeModal() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  public edit() {
    if (this.driver === null) return;
    this.router.navigate([`./edit`], { relativeTo: this.activatedRoute });
  }
}
