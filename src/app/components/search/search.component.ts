import { Component } from '@angular/core';
import * as algoliasearch from 'algoliasearch';

const searchClient = algoliasearch(
  '8Y3N3H5PNJ',
  '609661e7d659e337fe7a1b5bee6b42f0'
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  config = {
    indexName: 'dev_crds',
    searchClient,
  };
}
