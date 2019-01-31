import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perspective-hit',
  templateUrl: './perspective-hit.component.html',
  styleUrls: ['./perspective-hit.component.scss']
})
export class PerspectiveHitComponent {
  @Input() hit;
  @Input() results;
  constructor() { }
}
