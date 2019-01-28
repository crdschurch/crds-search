import { Injectable } from '@angular/core';
import { createClient } from 'contentful/dist/contentful.browser.min.js';
import { environment } from './../environments/environment.int';
import { Observable, from } from 'rxjs';
import { Suggested } from './suggested';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {
  private client;
  constructor() {
    this.client = createClient({
      space: environment.CONTENTFUL_SPACE_ID,
      accessToken: environment.CONTENTFUL_ACCESS_TOKEN,
      environment: environment.CONTENTFUL_ENV
    });;
  }

  public getContentBlock(id): Observable<Suggested> {
    return from(this.client.getEntry(id)).pipe(
     map((entry: any) => {
       return new Suggested(entry.fields.content);
     }) 
    )
  }
}
