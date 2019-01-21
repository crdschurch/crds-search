import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-refinement-list',
  templateUrl: './refinement-list.component.html',
  styleUrls: ['./refinement-list.component.scss']
})
export class RefinementList {
  @Input() hits;
  @Input() results;

  constructor() { }
}
