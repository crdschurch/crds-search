import {Component, Input, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {AnalyticsService} from 'src/app/services/analytics.service';

@Component({selector: 'app-hits', templateUrl: './hits.component.html', styleUrls: ['./hits.component.scss']})

export class HitsComponent implements OnChanges,
OnInit,
OnDestroy {
  @Input()hits;
  @Input()results;
  @Input()refine;
  private results$ : Subject < any > = new Subject();
  private results$Subscription : Subscription;
  constructor(private analyticsService : AnalyticsService) {}

  public handleHitClick(event : any) {
    let targetEl = event.path.find(this.isParent);
    let targetTitle = targetEl.querySelector('.hit-title .ais-Highlight').innerText;
    let target;
    let targetPostion;

    for (var i = 0; i < this.results.hits.length; i += 1) {
      if (this.results.hits[i].title.toLowerCase() === targetTitle.toLowerCase()) {
        target = this.results.hits[i];
        targetPostion = i + 1;
      }  
    }

    this.analyticsService.trackConversion( 
      this.results.query,
      target,
      targetPostion
      )
  }

  private isParent(el) {
    let str = el.outerHTML;
    // the space is important, without app-hit-text also returns
    if (str.includes("app-hit ")) {
      return el;
    } 
  }

  ngOnInit() {
    this.results$Subscription = this
      .results$
      .pipe(debounceTime(1500))
      .subscribe((res) => {
        if (res.query.length > 0 && res.query !== '') {
          this
            .analyticsService
            .trackSearch(res.query, res.count);
        }
      })
  }

  ngOnChanges(changes) {
    // if we ever search immediately, then this won't work
    if (!changes.results.firstChange) {
      const curQuery = changes.results.currentValue.query;
      const curCount = changes.results.currentValue.hits.length;
      this
        .results$
        .next({query: curQuery, count: curCount});
    }
  }

  ngOnDestroy() {
    this
      .results$Subscription
      .unsubscribe();
  }
}
