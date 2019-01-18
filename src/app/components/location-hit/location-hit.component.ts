import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-location-hit',
  templateUrl: './location-hit.component.html',
  styleUrls: ['./location-hit.component.scss']
})
export class LocationHitComponent {
  @Input() hit;
  constructor() { }

}
