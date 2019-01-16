import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterUnique'})

export class FilterUniquePipe implements PipeTransform {
  transform(items : any) : any {
    var flags = [], unique = [], l = items.length,i;
    for (i = 0; i < l; i++) {
      if (flags[items[i].contentType]) 
        continue;
      flags[items[i].contentType] = true;
      unique.push(items[i].contentType);
    }
    return unique;
  }
}
