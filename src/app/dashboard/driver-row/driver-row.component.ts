import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DriverStanding } from '../../driver-standings/utils/driver-standing.interface';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router } from '@angular/router';

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
  public view(id: DriverStanding['id']): void {
    this.router.navigate(['/dashboard/', id]);
  }

  public edit(id: DriverStanding['id']): void {
    this.router.navigate(['/dashboard/', id, 'edit']);
  }
}
