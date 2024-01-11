import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, map, merge, switchMap } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { DriverStanding } from '../../driver-standings/utils/driver-standing.interface';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, AsyncPipe, FormsModule, ButtonComponent, InputComponent],
})
export default class DriverEditComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  private paramStream = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.firebaseService.getDriver(id))
  );
  private dataStream = new BehaviorSubject<null | DriverStanding>(null);
  public driverStream = toSignal(merge(this.paramStream, this.dataStream));

  public close() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  public cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  public updateSignal(prop: keyof DriverStanding, event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    const data = this.driverStream();
    if (data) {
      this.dataStream.next({
        ...data,
        [prop]: value,
      });
    }
  }
  public save() {
    const data = this.driverStream();
    if (data) {
      this.firebaseService.writeData(data);
    }
  }
}
