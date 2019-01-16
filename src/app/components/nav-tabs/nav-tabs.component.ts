import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent {
  @Input() hits;
  @Input() results;
  constructor() { }

  public handleFilterClick(event: Event) {
    var filter = event.target.innerText;
    var refinementInput = document.querySelector(`input[value=${filter}]`);
    if (!refinementInput.checked) {
      refinementInput.click();  
    }
  }

}
