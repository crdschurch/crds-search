import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-refinement-list',
  templateUrl: './refinement-list.component.html',
  styleUrls: ['./refinement-list.component.scss']
})
export class RefinementList implements OnChanges {
  @Input() hits;
  @Input() results;

  currentRefinements = [];

  constructor() { }

  public setFilters() {
    var refinements: any = document.querySelectorAll('.ais-RefinementList-checkbox');
    for (var i = 0; i < refinements.length; i += 1) {
      if (refinements[i].value !== null) {
        this.currentRefinements.push(refinements[i].value);
      }
    }
  }

  public handleFilterClick(event: any) {
    // var filter = event.target.innerText;
    // if (!this.refinementInput.checked) {
    //   this.refinementInput.click();  
    // }
  }

  ngOnChanges(changes) {
    this.setFilters();
  }
}
