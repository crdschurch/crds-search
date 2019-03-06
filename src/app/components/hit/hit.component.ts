import {Component, Input, AfterViewInit} from '@angular/core';

@Component({selector: 'app-hit', templateUrl: './hit.component.html', styleUrls: ['./hit.component.scss']})
export class HitComponent implements AfterViewInit {
  @Input()hit;
  constructor() {}

  ngAfterViewInit() {
    // @ts-ignore
    imgix.init({force: true})
  }
}
