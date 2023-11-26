import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DriverStanding } from '../../driver-standings/utils/driver-standing.interface';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driver-row',
  templateUrl: './driver-row.component.html',
  styleUrls: ['./driver-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
})
export class DriverRowComponent {
  @Input({ required: true }) driver: DriverStanding | null = null;
  @Input({ required: true }) isFirst = false;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public openDrawer() {
    if (this.driver === null) return;
    this.router.navigate([`./${this.driver.id}`], { relativeTo: this.activatedRoute });
  }
}
