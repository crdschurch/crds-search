import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imgixAspectRatio' })
export class ImgixAspectRatioPipe implements PipeTransform {
  transform(hit: any): any {
    const audioList = ['album', 'song', 'podcast', 'episode'];
    const square = `${hit.image}?auto=format,compress&w=1&h=1&fit=crop`;
    const rect = `${hit.image}?auto=format,compress&w=4&h=3&fit=crop`;
    if (audioList.includes(hit.contentType)) {
      return square;
    } else {
      return rect;
    }
  }
}
