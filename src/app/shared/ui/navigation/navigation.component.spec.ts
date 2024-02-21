import { TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { Navigation, NAVIGATION_TOKEN } from '../../../app.component';

const arrange = (override?: { navigationItems?: Navigation }) => {
  const navigationItems = override?.navigationItems ?? [];
  TestBed.configureTestingModule({
    providers: [{ provide: NAVIGATION_TOKEN, useValue: navigationItems }],
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
describe.skip('NavigationComponent', () => {
  it('should create', () => {
    const { componentInstance } = arrange();
    expect(componentInstance).toBeTruthy();
  });

  it('should loop over navigationItems', () => {
    const hardcodedNavigationItems = 1;
    const navigationItems = {
      top: [
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
      bottom: [],
    };
    const { fixture } = arrange({
      navigationItems,
    });

    const items = fixture.debugElement.queryAll(By.directive(NavigationItemComponent));
    console.log('innerHTML:::', fixture.nativeElement.innerHTML);

    expect(items.length).toBe(navigationItems.top.length + hardcodedNavigationItems);
  });
  it('should pass the correct param to link', () => {
    const link = '/drivers';
    const { fixture } = arrange({
      navigationItems: {
        top: [
          {
            name: 'Drivers',
            link,
            icon: 'person',
          },
        ],
        bottom: [],
      },
    });
    const item = fixture.debugElement.query(By.directive(NavigationItemComponent));
    expect(item.componentInstance.link).toBe(link);
  });
  it('should pass the correct param to name', () => {
    const name = 'Drivers';
    const { fixture } = arrange({
      navigationItems: {
        top: [
          {
            name,
            link: '/drivers',
            icon: 'person',
          },
        ],
        bottom: [],
      },
    });
    const item = fixture.debugElement.query(By.directive(NavigationItemComponent));
    expect(item.componentInstance.name).toBe(name);
  });
  it('should pass the correct param to icon', () => {
    const icon = 'person';
    const { fixture } = arrange({
      navigationItems: {
        top: [
          {
            name: 'Drivers',
            link: '/drivers',
            icon,
          },
        ],
        bottom: [],
      },
    });
    const item = fixture.debugElement.query(By.directive(NavigationItemComponent));
    expect(item.componentInstance.icon).toBe(icon);
  });
});
