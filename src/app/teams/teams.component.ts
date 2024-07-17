import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { filter, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { ModalService } from '../shared/modal/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
export interface Team {
  id: string;
  name: string;
}
@Component({
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, ButtonComponent, InputComponent, ReactiveFormsModule, AsyncPipe],
})
export default class TeamsComponent {
  #firebaseService = inject(FirebaseService);
  #modalService = inject(ModalService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  searchControl = new FormControl();
  filteredTeams = this.#firebaseService.getTeam();
  add() {
    const id = this.#firebaseService.addTeam();
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }

  edit(id: Team['id']) {
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }

  view(id: Team['id']) {
    this.#router.navigate([id], { relativeTo: this.#route });
  }

  delete(id: Team['id']) {
    this.#modalService
      .open({
        content: {
          title: 'Delete team?',
          body: 'Are you sure you want to delete the team? ',
        },
      })
      .pipe(
        filter(({ confirmed }) => confirmed),
        tap(() => this.#firebaseService.deleteTeam(id))
      )
      .subscribe();
  }
}
