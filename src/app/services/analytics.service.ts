import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private analytics: Angulartics2) { }

  public trackSearch(Query, ResultsCount) {
    this.analytics.eventTrack.next({
      action: 'WebsiteSearch',
      properties: {
        Query,
        ResultsCount
      }
    });
  }

  public trackConversion(Query, Target, TargetPosition, isWidget) {
    this.analytics.eventTrack.next({
      action: 'WebsiteSearchConversion',
      properties: {
        Query,
        Target,
        TargetPosition,
        isWidget
      }
    });
  }

  public trackShowMoreClicked(Query, hitsPerPage, selectedRefinements){
    const failedHits = document.getElementsByTagName('app-hit').length;
    this.analytics.eventTrack.next({
      action: 'WebsiteSearchShowMoreClicked',
      properties: {
        Query,
        failedHits,
        newHitCount: failedHits + hitsPerPage,
        selectedRefinements: selectedRefinements
      }
    })
  }
}
