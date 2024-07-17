import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';
import { Team } from '../teams.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { DriverStanding } from 'src/app/shared/interfaces/driver-standing.interface';

@Component({
  templateUrl: './team-edit.component.html',
  styleUrl: './team-edit.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, InputComponent, ButtonComponent, ReactiveFormsModule, AsyncPipe],
})
export default class TeamEditComponent {
  #fb = inject(NonNullableFormBuilder);
  #firebaseService = inject(FirebaseService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  options = ['One', 'Two', 'Three'];

  #id = this.#activatedRoute.params.pipe(map((params) => params['id']));
  #teamData = this.#id.pipe(switchMap((id) => this.#firebaseService.getTeam(id)));
  drivers = this.#id.pipe(switchMap((id) => this.#firebaseService.getTeamMembers(id)));

  editForm = this.#teamData.pipe(
    map((teams) => teams[0]),
    map(({ name, id }) => this.#fb.group({ name, id }))
  );

  memberSearchControl = new FormControl('');
  memberSearchResults = toSignal(
    this.memberSearchControl.valueChanges.pipe(
      filter((searchValue) => !!searchValue),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchValue) => this.#firebaseService.searchDrivers(searchValue as string)), // we've used a filter
      map(({ results, searchValue }) => results.filter((result) => result.firstName?.startsWith(searchValue)))
    )
  );

  selectTeamLeader(formControl: AbstractControl | null, user: DriverStanding) {
    if (!formControl) {
      throw new Error('No formControl provided');
    }
    formControl.setValue(user);
  }
  save(form: Partial<Team>) {
    const id = this.#activatedRoute.snapshot.params['id'];
    this.#firebaseService.updateTeam(id, form);
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }

  cancel() {
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }

  addTeamMember(member: DriverStanding) {
    this.#firebaseService.addTeamMember(this.#activatedRoute.snapshot.params['id'], member);
  }
  removeMember(configurationId: Partial<DriverStanding>['id']) {
    if (!configurationId) {
      throw new Error('deleting configuration failed. No confoguration id provided');
    }
    this.#firebaseService.deleteTeamMember(this.#activatedRoute.snapshot.params['id'], configurationId);
  }
}
