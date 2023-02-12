import { TestBed } from '@angular/core/testing';
import { DarkModeService } from './dark-mode.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

describe('DarkModeService', () => {
  const arrange = () => {
    TestBed.configureTestingModule({
      providers: [DarkModeService],
    });

    const service = TestBed.inject(DarkModeService);
    const document = TestBed.inject(DOCUMENT);

    return {
      service,
      document,
    };
  };
  it('should be created', () => {
    const { service } = arrange();
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should set default theme to dark', () => {
      const { service, document } = arrange();

      const addSpy = jest.fn();
      document.body.classList.add = addSpy;
      const removeSpy = jest.fn();
      document.body.classList.remove = removeSpy;

      service.init();
      expect(removeSpy).not.toHaveBeenCalled();
      expect(addSpy).toHaveBeenCalledWith('dark');
    });
  });

  describe('toggle', () => {
    let sub: Subscription;
    afterEach(() => {
      sub.unsubscribe();
    });
    it('should switch from dark to light', () => {
      const { service, document } = arrange();

      const spy = jest.fn();
      document.body.classList.remove = spy;
      sub = service.isEnabled$.subscribe();

      service.init();
      service.toggle();
      expect(spy).toHaveBeenCalled();
    });

    it('should switch from light to dark', () => {
      const { service, document } = arrange();

      const removeSpy = jest.fn();
      document.body.classList.remove = removeSpy;
      const addSpy = jest.fn();
      document.body.classList.add = addSpy;

      sub = service.isEnabled$.subscribe();

      service.toggle();
      service.toggle();
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledTimes(2);
    });
  });
});
