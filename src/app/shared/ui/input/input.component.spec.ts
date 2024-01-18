import { InputComponent } from './input.component';
import { TestBed } from '@angular/core/testing';

describe('InputComponent', () => {
  function arrange() {
    TestBed.configureTestingModule({
      imports: [InputComponent],
    });

    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;

    return { fixture, component };
  }

  it('should create', () => {
    const { component } = arrange();
    expect(component).toBeTruthy();
  });
});
