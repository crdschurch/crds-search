import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  public configAlgolia(routing: boolean) {
    const config = {
      indexName: environment.ALGOLIA_INDEX,
      appId: environment.ALGOLIA_APP_ID,
      apiKey: environment.ALGOLIA_API_KEY,
      routing: routing,
      firstSearch: true,
      searchFunction(helper) {
        if (
          helper.state.hierarchicalFacetsRefinements &&
          helper.state.hierarchicalFacetsRefinements.contentType &&
          helper.state.hierarchicalFacetsRefinements.contentType[0] == undefined
        )
          delete helper.state.hierarchicalFacetsRefinements.contentType;
        if (helper.state.query || this.firstSearch === false) {
          helper.search();
        }
        this.firstSearch = false;
      },
    };

    return config;
  }
}
