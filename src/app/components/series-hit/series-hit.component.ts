import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-series-hit',
  templateUrl: './series-hit.component.html',
  styleUrls: ['./series-hit.component.scss']
})
export class SeriesHitComponent {
  @Input() hit;
  constructor() { }

}
