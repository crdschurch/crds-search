import { Component, Inject, forwardRef } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectSortBySelector } from "instantsearch.js/es/connectors";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-sort-by",
  templateUrl: "./sort-by.component.html",
  styleUrls: ["./sort-by.component.scss"],
})
export class SortBy extends BaseWidget {
  public state: any;
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("SortBy");
  }
  ngOnInit() {
    this.createWidget(connectSortBySelector, {
      // instance options
      indices: [
        {
          value: environment.ALGOLIA_INDEX,
          label: "Best Match",
          name: environment.ALGOLIA_INDEX,
        },
        {
          value: environment.ALGOLIA_INDEX + "_newest",
          label: "Newest",
          name: environment.ALGOLIA_INDEX + "_newest",
        },
      ],
    });
    super.ngOnInit();
  }

  handleClick(event){
    event.target.parentElement.parentElement.querySelector('ul').style.height = "auto";
  }

  onClick(event) {
    console.log(event);
  }
}
