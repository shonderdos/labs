import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import VerticalComponent from './vertical/vertical.component';
import EmptyComponent from './empty/empty.component';
import { HorizontalComponent } from './horizontal/horizontal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmptyComponent, VerticalComponent, HorizontalComponent],
})
export default class LayoutComponent {
  public layout = inject(ActivatedRoute).snapshot.data['layout'] ?? 'vertical';
}
