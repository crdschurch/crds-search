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
    let filterList = event.target.parentElement.parentElement.querySelector('ul')
    let currentHeight = filterList.offsetHeight;
    let filterLabel = event.target.parentElement.parentElement.querySelector('.filter-label__container');

    if (currentHeight === 0){
      filterLabel.classList.add('expanded')
      return filterList.classList.add('expanded');
    } else {
      filterLabel.classList.remove('expanded')
      return filterList.classList.remove('expanded');
    }
  }

  collapseMobileFilters(event){
    let parentFilterMenu = event.target.closest('ul');
    parentFilterMenu.classList.remove('expanded');
    return event.target.closest('.filters__container').querySelector('.filter-label__container').classList.remove('expanded');
  }

  handleSelection(event, value){
    this.state.refine(value)
    this.collapseMobileFilters(event);
  }

  onClick(event) {
    console.log(event);
  }
}
