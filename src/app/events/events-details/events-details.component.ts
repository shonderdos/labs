import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';

@Component({
  templateUrl: './events-details.component.html',
  styleUrl: './events-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, PageWrapperComponent, ButtonComponent],
})
export default class EventDetailsComponent {
  #firebaseService = inject(FirebaseService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #modalService = inject(ModalService);

  #id = this.#route.params.pipe(map(({ id }) => id));
  event = toSignal(
    this.#id.pipe(
      switchMap((id) => this.#firebaseService.getEvent(id)),
      map(([event]) => event)
    )
  );

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
          this.#firebaseService.deleteEvent(id);
          this.#router.navigate(['../'], { relativeTo: this.#route });
        })
      )
      .subscribe();
  }
}
