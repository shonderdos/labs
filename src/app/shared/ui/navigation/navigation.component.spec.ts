import { TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

const arrange = () => {
  TestBed.configureTestingModule({
    imports: [NavigationComponent, RouterTestingModule],
  });

  const fixture = TestBed.createComponent(NavigationComponent);
  const nativeElement = fixture.nativeElement;
  const componentInstance = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    nativeElement,
    componentInstance,
  };
};
describe('NavigationComponent', () => {
  it('should create', () => {
    const { componentInstance } = arrange();
    expect(componentInstance).toBeTruthy();
  });

  it('should have two links', () => {
    const { nativeElement } = arrange();
    const links = nativeElement.querySelectorAll('a');
    expect(links.length).toBe(2);
  });

  it('should have a link to drivers', () => {
    const { fixture } = arrange();
    const link = fixture.debugElement.queryAll(By.css('[data-test-id="drivers-link"]')).map(({ nativeElement }) => {
      return nativeElement.getAttribute('href');
    });

    expect(link).toEqual(expect.arrayContaining(['/drivers']));
  });

  it('should have a link to constructors', () => {
    const { fixture } = arrange();
    const link = fixture.debugElement
      .queryAll(By.css('[data-test-id="constructors-link"]'))
      .map(({ nativeElement }) => {
        return nativeElement.getAttribute('href');
      });

    expect(link).toEqual(expect.arrayContaining(['/constructors']));
  });
});
