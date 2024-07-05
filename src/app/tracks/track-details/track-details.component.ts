import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';

@Component({
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, ButtonComponent],
})
export default class TrackDetailsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #modalService = inject(ModalService);
  #firbaseService = inject(FirebaseService);
  #id = this.#route.params.pipe(
    take(1),
    map(({ id }) => id)
  );
  track = toSignal(
    this.#id.pipe(
      switchMap((id) => this.#firbaseService.getTrack(id)),
      map(([track]) => track)
    )
  );

  edit() {
    this.#router.navigate(['edit'], { relativeTo: this.#route });
  }
  delete() {
    this.#modalService
      .open({
        content: {
          title: 'Delete Track',
          body: 'Are you sure you want to delete this track? This action cannot be undone.',
        },
      })
      .pipe(
        filter(({ confirmed }) => confirmed),
        switchMap(() => this.#id),
        tap((id) => this.#firbaseService.deleteTrack(id)),
        switchMap(() => this.#router.navigate(['../'], { relativeTo: this.#route }))
      )
      .subscribe();
  }
}
