import { TestBed } from '@angular/core/testing';

import { NativeWindowRefService } from './native-window-ref.service';

describe('NativeWindowRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeWindowRefService = TestBed.get(NativeWindowRefService);
    expect(service).toBeTruthy();
  });
});
