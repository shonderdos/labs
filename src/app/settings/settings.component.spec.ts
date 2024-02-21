import { PageWrapperComponent } from '../shared/ui/page-wrapper/page-wrapper.component';
import { TestBed } from '@angular/core/testing';
import SettingsComponent from './settings.component';
import { DarkModePreference, DarkModeService } from '../shared/services/dark-mode/dark-mode.service';
import { signal, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-wrapper',
  template: '<ng-content></ng-content>',
})
class FakePageWrapperComponent {}
function arrange(overrides?: { darkModeService?: Partial<DarkModeService> }) {
  const stub = {
    darkModeService: {
      preference: signal(DarkModePreference.DARK),
      updatePreference: () => {},
      ...overrides?.darkModeService,
    },
  };
  TestBed.configureTestingModule({
    providers: [{ provide: DarkModeService, useValue: stub.darkModeService }],
    imports: [SettingsComponent],
  }).overrideComponent(SettingsComponent, {
    remove: {
      imports: [PageWrapperComponent],
    },
    add: { imports: [FakePageWrapperComponent] },
  });
  const fixture = TestBed.createComponent(SettingsComponent);
  const component = fixture.componentInstance;
  const debugElement = fixture.debugElement;

  fixture.detectChanges();

  return { fixture, component, debugElement };
}
describe('SettingsComponent', () => {
  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });

  it('should pass the correct value to the select', () => {
    const darkModePreference = DarkModePreference.DARK;
    const { debugElement } = arrange({
      darkModeService: { preference: signal(darkModePreference) },
    });

    const selectElement = debugElement.nativeElement.querySelector('select');
    expect(selectElement.value).toEqual(darkModePreference);
  });

  it('should call updatePreference with the correct value', () => {
    const spy = jest.fn();
    const { debugElement } = arrange({
      darkModeService: { updatePreference: spy },
    });
    const selectElement = debugElement.nativeElement.querySelector('select');
    const newValue = DarkModePreference.DARK;
    selectElement.value = newValue;
    selectElement.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith(newValue);
  });
});
