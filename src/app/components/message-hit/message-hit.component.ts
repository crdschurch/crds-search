import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-hit',
  templateUrl: './message-hit.component.html',
  styleUrls: ['./message-hit.component.scss']
})
export class MessageHitComponent {
  @Input() hit;
  constructor() { }
}
