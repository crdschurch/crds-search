import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'app-hits', templateUrl: './hits.component.html', styleUrls: ['./hits.component.scss']})
export class HitsComponent {
  @Input() hits;
  @Input() results;
  @Output() selectedSuggestion = new EventEmitter<string>()
  
  constructor() {}
  // 
}
