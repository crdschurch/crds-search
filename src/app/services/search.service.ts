import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  public configAlgolia() {
    let config = {
      indexName: environment.ALGOLIA_INDEX,
      appId: environment.ALGOLIA_APP_ID,
      apiKey: environment.ALGOLIA_API_KEY,
  }
  
    return config;
  }
}