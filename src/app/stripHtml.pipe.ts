import {Pipe, PipeTransform} from '@angular/core';

/*
 * Takes HTML and returns text
 */

@Pipe({name: 'stripHtml'})
export class StripHtmlPipe implements PipeTransform {
  transform(items : any) : any {
    let plainText = items.replace(/<[^>]*>/g, '');
    return plainText;
  }
}
