import {Injectable} from '@angular/core';
import {createClient} from 'contentful/dist/contentful.browser.min.js';
import {environment} from '../../environments/environment';
import {Observable, from} from 'rxjs';
import {Suggested} from '../suggested';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ContentfulService {
  private client;
  constructor() {
    this.client = createClient({space: environment.CONTENTFUL_SPACE_ID, accessToken: environment.CONTENTFUL_ACCESS_TOKEN, environment: environment.CONTENTFUL_ENV});;
  }

  public getSuggestedContentBlock() : Observable < Suggested > {
    return from(this.client.getEntries({ "sys.contentType.sys.id" : "content_block", "limit": 1000})).pipe(map((data : any) => {
      let entries = data.items;
      let title = 'suggestedSearch';
      for (let entry of entries) {
        if (entry.fields.title == title) {
          return new Suggested(entry.fields.content);
        }
      }
    }));
  }
}
