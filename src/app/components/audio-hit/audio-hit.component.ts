import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-hit',
  templateUrl: './audio-hit.component.html',
  styleUrls: ['./audio-hit.component.scss']
})
export class AudioHitComponent {
  @Input() hit;

  constructor() {}

}
