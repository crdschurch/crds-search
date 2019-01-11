import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.component.html',
  styleUrls: ['./hit.component.scss']
})
export class HitComponent implements OnInit {
  @Input() hit;
  constructor() { }

  ngOnInit() {
  }

}
