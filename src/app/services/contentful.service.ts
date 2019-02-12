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
    this.client = createClient({space: environment.CONTENTFUL_SPACE_ID, accessToken: environment.CONTENTFUL_ACCESS_TOKEN, environment: environment.CONTENTFUL_ENV});
  }

  public getSuggestedContentBlock() : Observable < Suggested > {
    return from(this.client.getEntries({
      "access_token": environment.CONTENTFUL_ACCESS_TOKEN,
      "content_type": "content_block",
      "fields.title": "suggestedSearch"}))
        .pipe(map((data : any) => {
          let suggestedContentBlock = data.items[0].fields.content;
          return new Suggested(suggestedContentBlock);
        }));
  }
}
