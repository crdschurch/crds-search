import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'imgixAspectRatio'})
export class ImgixAspectRatioPipe implements PipeTransform {
  transform(hit : any) : any {
    let square = `?auto=format,compress&w=1&h=1&fit=crop`;
    let rect = `?auto=format,compress&w=4&h=3&fit=crop`;
    if (hit.contentType == 'album' || hit.contentType == 'song' || hit.contentType == 'podcast' || hit.contentType == 'episode') {
      return hit.image + square
    } else {
      return hit.image + rect
    }
  }
}
