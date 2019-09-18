import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchModalComponent implements OnInit {
  public isVisible = false;

  constructor() { }

  ngOnInit() {
    $('#searchModal').on('shown.bs.modal', () => {
      setTimeout(() => { $('input.ais-SearchBox-input').focus() }, 500);
    });

    $('#searchModal').on('hidden.bs.modal', () => {});
  }
}
