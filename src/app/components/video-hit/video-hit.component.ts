import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-hit',
  templateUrl: './video-hit.component.html',
  styleUrls: ['./video-hit.component.scss']
})
export class VideoHitComponent implements OnInit {
  @Input() hit;

  constructor() { }

  ngOnInit() {
    
  }

}
