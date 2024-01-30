import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DriverStanding } from '../../shared/interfaces/driver-standing.interface';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-driver-row',
  templateUrl: './driver-row.component.html',
  styleUrls: ['./driver-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, ButtonComponent],
})
export class DriverRowComponent {
  @Input({ required: true }) driver: DriverStanding | null = null;
  @Input({ required: true }) isFirst = false;

  private router = inject(Router);
  private service = inject(FirebaseService);
  public view(id: DriverStanding['id']): void {
    this.router.navigate(['/drivers/', id]);
  }

  public edit(id: DriverStanding['id']): void {
    this.router.navigate(['/drivers/', id, 'edit']);
  }

  public delete(id: DriverStanding['id']): void {
    this.service.deleteDriver(id);
  }
}
