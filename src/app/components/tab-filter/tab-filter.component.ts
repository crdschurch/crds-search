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
    const transformedItems = [];
    
    for(const item of items){
      (item as any).label = item.label.replace('_', ' ');
      transformedItems.push(item);
    }

    return transformedItems;
  }
}
