import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnChanges {
  @Input() searchTerm: String;

  constructor() { }

  ngOnChanges(changes) {
    var input: HTMLInputElement = document.querySelector('input.ais-SearchBox-input');
    input.value = changes.searchTerm.currentValue;
  }

}
