import {Pipe, PipeTransform} from '@angular/core';
import kramed from 'kramed';

/*
 * Takes markdown and renders HTML
 */

@Pipe({name: 'parseMarkdown'})
export class ParseMarkdownPipe implements PipeTransform {
  transform(items : any) : any {
    let parsed = kramed(items)
    return parsed;
  }
}
