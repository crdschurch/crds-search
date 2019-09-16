import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hit-widget',
  templateUrl: './hit-widget.component.html',
  styleUrls: ['./hit-widget.component.scss']
})

export class HitWidgetComponent implements AfterViewInit {
  @Input() hit;
  constructor() {}
  ngAfterViewInit() {
    // @ts-ignore
    imgix.init({force: true});
  }
}
