import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { filter, map, switchMap, tap } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageWrapperComponent } from '../../shared/ui/page-wrapper/page-wrapper.component';
import { DriverStanding } from '../../shared/interfaces/driver-standing.interface';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, ButtonComponent, PageWrapperComponent],
})
export default class DriverDetailsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  private modalService = inject(ModalService);
  public driver = toSignal(
    this.activatedRoute.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.firebaseService.getDriver(id))
    )
  );
  teams = toSignal(
    this.activatedRoute.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.firebaseService.getDriverTeams(id))
    )
  );
  public edit() {
    if (this.driver === null) return;
    this.router.navigate([`./edit`], { relativeTo: this.activatedRoute });
  }
  public delete(id: DriverStanding['id']): void {
    this.modalService
      .open()
      .pipe(
        filter(({ confirmed }) => confirmed),
        tap(() => this.firebaseService.deleteDriver(id)),
        tap(() => this.router.navigate(['/drivers']))
      )
      .subscribe();
  }
}
