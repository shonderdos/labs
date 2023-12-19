import { DarkModeService } from './dark-mode.service';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { DOCUMENT } from '@angular/common';

describe('DarkModeService', () => {
  const arrange = () => {
    TestBed.configureTestingModule({
      providers: [
        DarkModeService,
        {
          provide: LocalStorageService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    });
    const service = TestBed.inject(DarkModeService);
    const document = TestBed.inject(DOCUMENT);
    return { service, document };
  };
  it('should be created', () => {
    const { service } = arrange();

    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should call match media with the correct param', () => {
      const { service, document } = arrange();

      document.body.classList.add = jest.fn();
      // @ts-ignore
      document.defaultView.matchMedia = jest.fn(() => ({ addEventListener: jest.fn() }));

      service.init();

      expect(document.defaultView?.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });
  });
});
