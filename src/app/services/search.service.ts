import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  public firstSearch = true;
  public configAlgolia(routing: boolean) {
    let config = {
      indexName: environment.ALGOLIA_INDEX,
      appId: environment.ALGOLIA_APP_ID,
      apiKey: environment.ALGOLIA_API_KEY,
      routing: routing,
      searchFunction(helper) {
        if (helper.state.query || this.firstSearch == false)
          helper.search();
        this.firstSearch = false;
      }
    }

    return config;
  }
}
