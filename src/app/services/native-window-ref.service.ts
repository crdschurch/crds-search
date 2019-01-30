import { Injectable } from '@angular/core';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class NativeWindowRefService {
  constructor() {}
  get nativeWindow() {
    return _window();
  }
}
