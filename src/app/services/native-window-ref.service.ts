import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class NativeWindowRefService {
  get nativeWindow() {
    return _window();
  }
}
