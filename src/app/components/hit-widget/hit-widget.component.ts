import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hit-widget',
  templateUrl: './hit-widget.component.html',
  styleUrls: ['./hit-widget.component.scss']
})
export class HitWidgetComponent {
  @Input() hit;
  constructor() {}
}
