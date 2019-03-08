import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jQuery from 'jquery';

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

  ngOnInit() {
    $('#searchModal').on('show.bs.modal', () => {
      this.isVisible = true;
    });

    $('#searchModal').on('hidden.bs.modal', () => {
      this.isVisible = false;
    });
  }
}
