import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  const arrange = () => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });

    const service = TestBed.inject(LocalStorageService);

    return { service };
  };

  it('should be created', () => {
    const { service } = arrange();
    expect(service).toBeTruthy();
  });

  it('basic functionality should work', () => {
    const key = 'key';
    const value = 'value';
    const { service } = arrange();
    service.set(key, value);

    const result = service.get(key);
    expect(result).toBe(value);
  });
});
