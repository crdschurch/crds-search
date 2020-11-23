import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tab-filter",
  templateUrl: "./tab-filter.component.html",
  styleUrls: ["./tab-filter.component.scss"],
})
export class TabFilterComponent {
  @Input() hits;
  @Input() results;

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
    event.target.parentElement.parentElement.querySelector('ul').style.height = "auto";
  }
}
