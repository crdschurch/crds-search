import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-episode-hit',
  templateUrl: './episode-hit.component.html',
  styleUrls: ['./episode-hit.component.scss']
})
export class EpisodeHitComponent {
  @Input() hit;

  constructor() {}

}
