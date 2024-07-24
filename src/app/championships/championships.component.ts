import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Championship, FirebaseService } from '../shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../shared/modal/modal.service';
import { filter, tap } from 'rxjs';

@Component({
  templateUrl: './championship.component.html',
  styleUrl: './championship.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, ButtonComponent, InputComponent, ReactiveFormsModule, AsyncPipe],
})
export default class ChampionshipsComponent {
  #firebaseService = inject(FirebaseService)
  #router = inject(Router)
  #route = inject(ActivatedRoute)
  #modalService = inject(ModalService)
  searchControl = new FormControl("")
  filteredChampionships = this.#firebaseService.getChampionship();

  add() {
    const id = this.#firebaseService.addChampionship();
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }

  view(id: Championship['id']) {
    this.#router.navigate([id], { relativeTo: this.#route })
  }

  edit(id: Championship['id']) {
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }

  delete(id: Championship["id"]) {
    this.#modalService
      .open({
        content: {
          title: 'Delete championship?',
          body: 'Are you sure you want to delete the championship? ',
        },
      })
      .pipe(
        filter(({ confirmed }) => confirmed),
        tap(() => this.#firebaseService.deleteChampionship(id))
      )
      .subscribe();
  }
}
