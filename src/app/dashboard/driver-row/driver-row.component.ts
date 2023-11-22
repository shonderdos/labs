import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DriverStanding } from '../../driver-standings/utils/driver-standing.interface';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-driver-row, [app-driver-row]',
  templateUrl: './driver-row.component.html',
  styleUrls: ['./driver-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class DriverRowComponent {
  @Input({ required: true }) driver: DriverStanding | null = null;

  private firebaseService = inject(FirebaseService);
  public submit({ points, position, id }: DriverStanding): void {
    this.firebaseService.writeData({ id, points, position });
  }
}
