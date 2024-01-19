import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = 'Search';
  @Input() name: string | undefined;
  @Input() type: string = 'text';
  value: string | number | undefined = '';
  public changed: (value: string) => void = () => {};
  public touched: () => void = () => {};
  public disabled = false;

  registerOnChange(fn: (v: string) => void): void {
    this.changed = fn;
  }

  onChange(event: Event) {
    this.changed((event.target as HTMLInputElement).value);
  }

  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string | number): void {
    this.value = value;
  }
}
