import {Component, Output, EventEmitter} from '@angular/core';

@Component({selector: 'app-suggested', templateUrl: './suggested.component.html', styleUrls: ['./suggested.component.scss']})

export class SuggestedComponent {  
  content = [
    {
      "title": "Superbowl 2019",
      "url": "https://www.crossroads.net/superbowl/"
    }, {
      "title": "jobs",
      "url": "https://www.crossroads.net/jobs/"
    }, {
      "title": "man camp signup",
      "url": "https://crossroads.net/mancamp/signup"
    }, {
      "title": "articles on leadership",
      "url": "https://media.crossroads.net/topics/leadership"
    }
  ]

  @Output() selected = new EventEmitter<string>();
  constructor() {}

  public handleSuggestedClick(term) {
    this.selected.emit(term.title);
  }
}
