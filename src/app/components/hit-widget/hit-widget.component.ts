import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hit-widget',
  templateUrl: './hit-widget.component.html',
  styleUrls: ['./hit-widget.component.scss']
})
export class HitWidgetComponent {
  public iframe: any;
  public iframeLoaded() {
    console.log("called");
    this.iframe = document.getElementById('widgetIframe');
    if (this.iframe) {
      // here you can make the height, I delete it first, then I make it again
      this.iframe.height = "";
      this.iframe.height = this.iframe.contentWindow.document.body.scrollHeight + "px";
    }
  }
  @Input() hit;
  constructor() {
    this.iframeLoaded();
  }
}
