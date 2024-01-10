import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
})
export class ButtonComponent {
  @Input() public displayMode: 'icon' | 'text' | 'icon-text' = 'text';
  @Input() public theme: 'transparent' | 'primary' | 'accent' | 'warn' = 'primary';
  @Input() public icon: string | null = null;

  public get classList() {
    return {
      button: true,
      [`display-mode__${this.displayMode}`]: true,
      [`theme__${this.theme}`]: true,
    };
  }

  public get displayIcon(): boolean {
    return ['icon', 'icon-text'].includes(this.displayMode) && this.icon !== null;
  }

  public get displayText(): boolean {
    return ['text', 'icon-text'].includes(this.displayMode);
  }
}
