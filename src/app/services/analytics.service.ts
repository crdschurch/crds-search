import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private analytics : Angulartics2) { }

  public trackSearch(query, resultsCount) {
    this.analytics.eventTrack.next({
      action: 'WebsiteSearch',
      properties: {
        query,
        resultsCount
      }
    });
  }
}
