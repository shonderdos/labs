import { TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';

const arrange = (override?: { navigationItems?: { name: string; link: string; icon: string }[] }) => {
  const navigationItems = override?.navigationItems ?? [];
  TestBed.configureTestingModule({
    imports: [NavigationComponent, RouterTestingModule],
  });

  const fixture = TestBed.createComponent(NavigationComponent);
  const nativeElement = fixture.nativeElement;
  const componentInstance = fixture.componentInstance;

  componentInstance.navigationItems = navigationItems;

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

  it('should loop over navigationItems', () => {
    const { fixture } = arrange({
      navigationItems: [
        {
          name: 'Drivers',
          link: '/drivers',
          icon: 'person',
        },
        {
          name: 'Constructors',
          link: '/constructors',
          icon: 'people',
        },
        {
          name: 'Settings',
          link: '/settings',
          icon: 'settings',
        },
      ],
    });

    const items = fixture.debugElement.queryAll(By.directive(NavigationItemComponent));

    expect(items.length).toBe(3);
  });
  it('should pass the correct param to link', () => {
    const link = '/drivers';
    const { fixture } = arrange({
      navigationItems: [
        {
          name: 'Drivers',
          link,
          icon: 'person',
        },
      ],
    });
    const item = fixture.debugElement.query(By.directive(NavigationItemComponent));
    expect(item.componentInstance.link).toBe(link);
  });
  it('should pass the correct param to name', () => {
    const name = 'Drivers';
    const { fixture } = arrange({
      navigationItems: [
        {
          name,
          link: '/drivers',
          icon: 'person',
        },
      ],
    });
    const item = fixture.debugElement.query(By.directive(NavigationItemComponent));
    expect(item.componentInstance.name).toBe(name);
  });
  it('should pass the correct param to icon', () => {
    const icon = 'person';
    const { fixture } = arrange({
      navigationItems: [
        {
          name: 'Drivers',
          link: '/drivers',
          icon,
        },
      ],
    });
    const item = fixture.debugElement.query(By.directive(NavigationItemComponent));
    expect(item.componentInstance.icon).toBe(icon);
  });
});
