import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hit-text',
  templateUrl: './hit-text.component.html',
  styleUrls: ['./hit-text.component.scss']
})
export class HitTextComponent {
  @Input() hit;
  constructor() { }

}
