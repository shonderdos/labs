import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';
import { map, switchMap } from 'rxjs';
import { FirebaseService, Track } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  templateUrl: './track-edit.component.html',
  styleUrl: './track-edit.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent, PageWrapperComponent, InputComponent, ButtonComponent, AsyncPipe, ReactiveFormsModule],
})
export default class EditTrackComponent {
  #fb = inject(NonNullableFormBuilder);
  #firebaseService = inject(FirebaseService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  editForm = this.#activatedRoute.params.pipe(
    map((params) => params['id']),

    switchMap((id) => this.#firebaseService.getTrack(id)),
    map(([track]) => track),
    map(({ name, lat, lon }) =>
      this.#fb.group({
        name,
        lat,
        lon,
      })
    )
  );

  save(formValues: Partial<Track>) {
    const id = this.#activatedRoute.snapshot.params['id'];

    this.#firebaseService.updateTrack(id, formValues);
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }
  cancel() {
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }
}
