import {Component, Input, AfterViewInit} from '@angular/core';

@Component({selector: 'app-hit', templateUrl: './hit.component.html', styleUrls: ['./hit.component.scss']})
export class HitComponent implements AfterViewInit {
  albumImgixParams = `?auto=format,compress&w=1&h=1&fit=crop`;
  imgixParams = `?auto=format,compress&w=4&h=3&fit=crop`;
  @Input()hit;
  constructor() {}

  ngAfterViewInit() {
    // @ts-ignore
    imgix.init({force: true})
  }
}
