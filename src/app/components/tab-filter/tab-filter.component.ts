import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-filter',
  templateUrl: './tab-filter.component.html',
  styleUrls: ['./tab-filter.component.scss']
})
export class TabFilterComponent {
  @Input() hits;
  @Input() results;

  transformItems(items) {
    
    items = [
      {
        label: 'all results',
        value: ''
      },
      ...items
    ]
    return items.map(item => ({
      ...item,
      label: item.label.replace('_', ' ')
    }));
  }
}
