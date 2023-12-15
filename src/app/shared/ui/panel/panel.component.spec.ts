import { TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  const arrange = () => {
    TestBed.configureTestingModule({
      imports: [PanelComponent],
    });
    const fixture = TestBed.createComponent(PanelComponent);
    const debugElement = fixture.debugElement;
    const component = fixture.componentInstance;

    fixture.detectChanges();

    return { debugElement, component };
  };

  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });
});
