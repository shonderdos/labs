import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Championship, FirebaseService, Track } from 'src/app/shared/services/firebase/firebase.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';

interface Event {
  id: string;
  date: string;
  track: Track;
}

@Component({
  templateUrl: './championship-edit.component.html',
  styleUrl: './championship-edit.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, InputComponent, ButtonComponent, ReactiveFormsModule, AsyncPipe],
})
export default class ChampionshipEditComponent {
  #fb = inject(NonNullableFormBuilder);
  #firebaseService = inject(FirebaseService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  #id = this.#activatedRoute.params.pipe(map((params) => params['id']));
  #championshipData = this.#id.pipe(switchMap((id) => this.#firebaseService.getChampionship(id)));
  championshipEvents = this.#id.pipe(switchMap((id) => this.#firebaseService.getChampionshipEvents(id)));
  allEvents = this.#firebaseService.getEvent();

  editForm = this.#championshipData.pipe(
    map((teams) => teams[0]),
    map(({ name, id }) => this.#fb.group({ name, id }))
  );

  save(form: Partial<Championship>) {
    const id = this.#activatedRoute.snapshot.params['id'];
    this.#firebaseService.updateChampionship(id, form);
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }

  cancel() {
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }

  addEvent(eventId: Event['id']) {
    const championshipId = this.#activatedRoute.snapshot.params['id'];
    this.#firebaseService.addChampionshipEvent(championshipId, eventId);
  }

  deleteEvent(eventId: Event['id']) {
    const championshipId = this.#activatedRoute.snapshot.params['id'];
    this.#firebaseService.deleteChampionshipEvent(championshipId, eventId);
  }
}
