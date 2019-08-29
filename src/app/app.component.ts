import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { NativeWindowRefService } from './services/native-window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private windowRef: NativeWindowRefService,
    ) {
  }
}
