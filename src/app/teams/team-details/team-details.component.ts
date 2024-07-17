import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, filter, tap } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, PageWrapperComponent, ButtonComponent],
})
export default class TeamDetailsComponent {
  #firebaseService = inject(FirebaseService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #modalService = inject(ModalService);

  #id = this.#route.params.pipe(map(({ id }) => id));
  team = toSignal(
    this.#id.pipe(
      switchMap((id) => this.#firebaseService.getTeam(id)),
      map(([team]) => team)
    )
  );

  members = toSignal(this.#id.pipe(switchMap((id) => this.#firebaseService.getTeamMembers(id))));

  edit() {
    this.#router.navigate(['edit'], { relativeTo: this.#route });
  }

  delete() {
    this.#modalService
      .open({ content: { title: 'are you sure?', body: 'this can not be undone' } })
      .pipe(
        filter(({ confirmed }) => confirmed),
        switchMap(() => this.#id),
        tap((id) => {
          this.#firebaseService.deleteTeam(id);
          this.#router.navigate(['../'], { relativeTo: this.#route });
        })
      )
      .subscribe();
  }
}
