import {Component, Input, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {AnalyticsService} from 'src/app/services/analytics.service';

@Component({selector: 'app-hits', templateUrl: './hits.component.html', styleUrls: ['./hits.component.scss']})
export class HitsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() hits;
  @Input() results;
  @Input() refine;
  private results$ : Subject < any > = new Subject();
  private results$Subscription : Subscription;
  constructor(private analyticsService : AnalyticsService) {}

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
    if (changes.results && !changes.results.firstChange) {
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
