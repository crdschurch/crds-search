import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchModalComponent {
  public isVisible = false;

  constructor() { 
  }
}
