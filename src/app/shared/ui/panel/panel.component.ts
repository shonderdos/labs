import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @Input() style: 'rounded' | 'square' = 'rounded';

  @HostBinding('class') get classList() {
    return {
      [`border-radius-${this.style}`]: true,
    };
  }
}
