import { Component, Inject, forwardRef } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectMenu } from "instantsearch.js/es/connectors";

@Component({
  selector: "app-tab-filter",
  templateUrl: "./tab-filter.component.html",
  styleUrls: ["./tab-filter.component.scss"],
})
export class TabFilterComponent extends BaseWidget {
  public state: {
    items: any[];
    refine: Function;
    createURL: Function;
    isShowingMore: boolean;
    canToggleShowMore: boolean;
    toggleShowMore: Function;
    widgetParams: object;
    filterByisExpanded: boolean;
  };
  public currentRefinement: string;
  public filterByisExpanded: boolean = false;
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("Menu");
  }
  ngOnInit() {
    this.createWidget(connectMenu, {
      // instance options
      attributeName: "contentType",
      transformItems: (items) => {
        function formatLabel(label) {
          label = label.replace("_", " ");
          if (label.endsWith("s") || label == "all") return label;
          return label + "s";
        }

        if (!items.find((i) => i.label == "all"))
          items.push({
            count: items.reduce(
              (accumulator, item) => accumulator + item.count,
              0
            ),
            isRefined: false,
            data: null,
            label: "all",
            value: "",
          });

        var isAll = !items.find(
          (i) => i.isRefined == true && i.label !== "all"
        );

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
      },
    });
    super.ngOnInit();
  }

  collapseMobileFilters() {
    return (this.state.filterByisExpanded = false);
  }

  handleSelection(event, value) {
    this.state.refine(value);
    return this.collapseMobileFilters();
  }

  handleClick() {
    return (this.state.filterByisExpanded = !this.state.filterByisExpanded);
  }

  getSelected() {
    var selectedItem = this.state.items.find((item) => item.isRefined === true);
    return (selectedItem && selectedItem.label) || "all";
  }
}
