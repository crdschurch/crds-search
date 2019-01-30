import { Component } from '@angular/core';
import { environment } from './../environments/environment.int';
import * as algoliasearch from 'algoliasearch';

const searchClient = algoliasearch(
  environment.ALGOLIA_APP_ID,
  environment.ALGOLIA_API_KEY
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  config = {
    indexName: environment.ALGOLIA_INDEX,
    searchClient
  }
}
