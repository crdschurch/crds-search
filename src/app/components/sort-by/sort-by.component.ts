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
  public sortByisExpanded: boolean = false;

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

  handleClick(){
    return this.state.sortByisExpanded = !this.state.sortByisExpanded;
  }

  collapseMobileFilters(){
    return this.state.sortByisExpanded = false;
  }

  handleSelection(event, value){
    this.state.refine(value)
    return this.collapseMobileFilters();
  }

  onClick(event) {
    console.log(event);
  }
}
