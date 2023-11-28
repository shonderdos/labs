import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DriverStanding } from '../../driver-standings/utils/driver-standing.interface';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, AsyncPipe, FormsModule, ButtonComponent],
})
export default class DriverEditComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  public driverStream = toSignal(
    this.activatedRoute.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.firebaseService.getDriver(id)),
      map(Object.entries)
    )
  );

  public close() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  public cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  public save() {
    const data = this.driverStream() as [keyof DriverStanding, string | number][];
    if (data) {
      const sub = Object.fromEntries<string | number>(data) as unknown as DriverStanding;
      this.firebaseService.writeData(sub);
    }
  }
}
