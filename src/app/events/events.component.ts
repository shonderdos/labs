import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../shared/modal/modal.service';
import { filter, tap } from 'rxjs';
import { Event } from './events-edit/events-edit.component';

@Component({
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent, PanelComponent, ButtonComponent, InputComponent, ReactiveFormsModule, AsyncPipe],
})
export default class EventsComponent {
  #firebaseService = inject(FirebaseService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #modalService = inject(ModalService);
  searchControl = new FormControl('');
  filteredEvents = this.#firebaseService.getEvent();

  add() {
    const id = this.#firebaseService.addEvent();
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }

  view(id: Event['id']) {
    this.#router.navigate([id], { relativeTo: this.#route });
  }

  edit(id: Event['id']) {
    this.#router.navigate([id, 'edit'], { relativeTo: this.#route });
  }

  delete(id: Event['id']) {
    this.#modalService
      .open({
        content: {
          title: 'Delete event?',
          body: 'Are you sure you want to delete the event? ',
        },
      })
      .pipe(
        filter(({ confirmed }) => confirmed),
        tap(() => this.#firebaseService.deleteEvent(id))
      )
      .subscribe();
  }
}
