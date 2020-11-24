import { Component, Inject, forwardRef } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSortBySelector } from "instantsearch.js/es/connectors";



@Component({
  selector: "app-tab-filter",
  templateUrl: "./tab-filter.component.html",
  styleUrls: ["./tab-filter.component.scss"],
})
export class TabFilterComponent extends BaseWidget{
  public state: {
     items: object[];
     refine: Function;
     createURL: Function;
     isShowingMore: boolean;
     canToggleShowMore: boolean;
     toggleShowMore: Function;
     widgetParams: object;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('TabFilterComponent');
  }

  ngOnInit() {
    this.createWidget(connectSortBySelector, {
      attribute: 'contentType',
    });
    super.ngOnInit();
  }

  transformItems(items) {
    function formatLabel(label) {
      label = label.replace("_", " ");
      if (label.endsWith("s") || label == "all") return label;
      return label + "s";
    }

    if (!items.find((i) => i.label == "all"))
      items.push({
        count: items.reduce((accumulator, item) => accumulator + item.count, 0),
        isRefined: false,
        data: null,
        label: "all",
        value: "",
      });

    var isAll = !items.find((i) => i.isRefined == true && i.label !== "all");

    return items
      .map((item) => {
        if (item.label == "all" && isAll) item.isRefined = true;
        return {
          ...item,
          label: formatLabel(item.label),
        };
      })
      .sort((a, b) => {
        if (a.label == "all") return -1;
        if (a.label == "pages") return -1;
        return a.label.localeCompare(b.label);
      });
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

}
