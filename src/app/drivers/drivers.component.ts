import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { AsyncPipe } from '@angular/common';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, of, startWith, tap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { PanelComponent } from '../shared/ui/panel/panel.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { DriverStanding } from '../shared/interfaces/driver-standing.interface';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    MatIconModule,
    FormsModule,
    PageWrapperComponent,
    PanelComponent,
    MatIconModule,
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
})
export default class DriversComponent {
  private firebaseService = inject(FirebaseService);
  private route = inject(Router);
  public drivers = this.firebaseService.getDriverStandings() || of([]);

  private router = inject(Router);
  private modalService = inject(ModalService);
  private service = inject(FirebaseService);
  public searchControl = new FormControl();
  private searchTerm = this.searchControl.valueChanges.pipe(debounceTime(150), distinctUntilChanged(), startWith(''));

  public filteredDrivers = combineLatest([this.drivers, this.searchTerm]).pipe(
    map(([drivers, filter]): DriverStanding[] => {
      return drivers.filter(({ firstName, lastName }) => {
        if (!filter && (!firstName || !lastName)) return true;
        return [firstName, lastName].some((name) => name?.toLowerCase().includes(filter.toLowerCase()));
      });
    })
  );
  public view(id: DriverStanding['id']): void {
    this.router.navigate(['/drivers/', id]);
  }

  public edit(id: DriverStanding['id']): void {
    this.router.navigate(['/drivers/', id, 'edit']);
  }

  public delete(id: DriverStanding['id']): void {
    this.modalService
      .open()
      .pipe(
        filter(({ confirmed }) => confirmed),
        tap(() => this.service.deleteDriver(id))
      )
      .subscribe();
  }

  public async addNewDriver() {
    const id = await this.firebaseService.addNewDriver();
    this.route.navigate(['/drivers', id, 'edit']);
  }
}
