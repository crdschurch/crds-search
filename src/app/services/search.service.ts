import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private contentType: string;
  public configAlgolia(routing: boolean, contentType?: string) {
    this.contentType = contentType;
    const config = {
      indexName: environment.ALGOLIA_INDEX,
      appId: environment.ALGOLIA_APP_ID,
      apiKey: environment.ALGOLIA_API_KEY,
      routing: routing,
      searchFunction(helper) {
        if (
          helper.state.hierarchicalFacetsRefinements &&
          helper.state.hierarchicalFacetsRefinements.contentType &&
          helper.state.hierarchicalFacetsRefinements.contentType[0] == undefined
        )
          delete helper.state.hierarchicalFacetsRefinements.contentType;
        if (contentType) {
          helper.state.hierarchicalFacets = [
            {
              attributes: ["contentType"],
              name: "contentType",
            },
          ];
          helper.state.hierarchicalFacetsRefinements = {
            contentType: [contentType],
          };
        }

        helper.search();
      },
    };

    return config;
  }
}
