import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { FirebaseService, Track } from 'src/app/shared/services/firebase/firebase.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';

export interface Event {
  id: string;
  date: string;
  track: Track;
}

@Component({
  templateUrl: './events-edit.component.html',
  styleUrl: './events-edit.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, InputComponent, ButtonComponent, ReactiveFormsModule, AsyncPipe],
})
export default class EventEditComponent {
  #fb = inject(NonNullableFormBuilder);
  #firebaseService = inject(FirebaseService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  #id = this.#activatedRoute.params.pipe(map((params) => params['id']));
  #eventData = this.#id.pipe(switchMap((id) => this.#firebaseService.getEvent(id)));
  events = of([{ date: 'in 3 days', track: {} }] as Event[]);

  editForm = this.#eventData.pipe(
    map((teams) => teams[0]),
    map(({ id, date }) => this.#fb.group({ id, date }))
  );

  save(form: Partial<Event>) {
    const id = this.#activatedRoute.snapshot.params['id'];
    this.#firebaseService.updateEvent(id, form);
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }

  cancel() {
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }
}
