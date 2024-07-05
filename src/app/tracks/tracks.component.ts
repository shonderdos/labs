import { inject, ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../shared/modal/modal.service';
import { filter, tap } from 'rxjs';

@Component({
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageWrapperComponent,
    PanelComponent,
    InputComponent,
    ReactiveFormsModule,
    InputComponent,
    AsyncPipe,
    ButtonComponent,
  ],
})
export default class TracksComponent {
  #firebaseService = inject(FirebaseService);
  #modalService = inject(ModalService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #allTracks = this.#firebaseService.getTrack();
  filteredTracks = this.#allTracks;
  searchControl = new FormControl();

  addNewTrack() {
    const id = this.#firebaseService.addTrack();
    this.#router.navigate([`./${id}/edit`], { relativeTo: this.#route });
  }
  view(id: string) {
    if (!id) {
      console.error('provide ID when invoking view()');
      return;
    }
    this.#router.navigate([id], { relativeTo: this.#route });
  }
  edit(id: string) {
    if (!id) {
      console.error('provide ID when invoking edit()');
      return;
    }
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }
  delete(id: string) {
    this.#modalService
      .open({ content: { title: 'Delete Track', body: 'Are you sure you want to delete this track?' } })
      .pipe(
        filter(({ confirmed }) => confirmed),
        tap(() => this.#firebaseService.deleteTrack(id))
      )
      .subscribe();
  }
}
