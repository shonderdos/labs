import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { DriverStanding } from '../../shared/interfaces/driver-standing.interface';
import { PageWrapperComponent } from '../../shared/ui/page-wrapper/page-wrapper.component';
import { Team } from '../../teams/teams.component';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PanelComponent,
    AsyncPipe,
    FormsModule,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    PageWrapperComponent,
    RouterLink,
  ],
})
export default class DriverEditComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  private fb = inject(FormBuilder);
  public editForm = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.firebaseService.getDriver(id)),
    map(({ id, lastName, firstName, email, phoneNumber }) =>
      this.fb.group({
        id,
        lastName,
        firstName,
        email,
        phoneNumber,
      })
    )
  );

  driverTeams = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.firebaseService.getDriverTeams(id))
  );

  allTeams = this.firebaseService.getTeam();

  removeFromTeam(teamId: Team['id']) {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.firebaseService.deleteTeamMember(teamId, userId);
  }

  addToTeam(teamId: Team['id']) {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.firebaseService.addTeamMember(teamId, userId);
  }

  public cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  public save(value: DriverStanding) {
    this.firebaseService.writeData(value);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
