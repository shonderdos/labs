import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { PageWrapperComponent } from 'src/app/shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from 'src/app/shared/ui/panel/panel.component';
import { map, switchMap } from 'rxjs';
import { FirebaseService, Track, TrackConfiguration } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  templateUrl: './track-edit.component.html',
  styleUrl: './track-edit.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PanelComponent,
    PageWrapperComponent,
    InputComponent,
    ButtonComponent,
    AsyncPipe,
    ReactiveFormsModule,
    JsonPipe,
  ],
})
export default class EditTrackComponent {
  #fb = inject(NonNullableFormBuilder);
  #firebaseService = inject(FirebaseService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  #trackId = this.#activatedRoute.params.pipe(map((params) => params['id']));
  #trackData = this.#trackId.pipe(switchMap((id) => this.#firebaseService.getTrack(id)));
  configurationData = this.#trackId.pipe(switchMap((id) => this.#firebaseService.getTrackConfiguration(id)));

  editForm = this.#trackData.pipe(
    map((tracks) => tracks[0]),
    map(({ lat, lon, name }) => this.#fb.group({ lat, lon, name }))
  );

  configurationsForm = this.configurationData.pipe(
    map((configurations) => {
      return this.#fb.group({
        configs: this.#fb.array(configurations.map((configuration) => this.#fb.group(configuration))),
      });
    })
  );

  save(form: Partial<Track>) {
    const id = this.#activatedRoute.snapshot.params['id'];

    this.#firebaseService.updateTrack(id, form);

    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }
  cancel() {
    this.#router.navigate(['../'], { relativeTo: this.#activatedRoute });
  }

  addConfiguration() {
    this.#firebaseService.addConfiguration(this.#activatedRoute.snapshot.params['id']);
  }
  deleteConfiguration(configurationId: Partial<TrackConfiguration>['id']) {
    if (!configurationId) {
      throw new Error('deleting configuration failed. No confoguration id provided');
    }
    this.#firebaseService.deleteTrackConfiguration(this.#activatedRoute.snapshot.params['id'], configurationId);
  }
  updateConfiguration(configuration: Partial<TrackConfiguration>) {
    if (!configuration.name || !configuration.id) {
      throw new Error('update failed. No configuration provided');
    }
    this.#firebaseService.updateTrackConfiguration(
      this.#activatedRoute.snapshot.params['id'],
      configuration as TrackConfiguration
    );
  }
}
