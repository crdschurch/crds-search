import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-filter',
  templateUrl: './tab-filter.component.html',
  styleUrls: ['./tab-filter.component.scss']
})
export class TabFilter {
  @Input() hits;
  @Input() results;

  transformItems(items) {
    return items.map(item => ({
      ...item,
      label: item.label.replace('_', ' ')
    }));
  }
}
