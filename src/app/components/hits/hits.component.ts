import { Component, Input, OnChanges, OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AnalyticsService } from "src/app/services/analytics.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-hits",
  templateUrl: "./hits.component.html",
  styleUrls: ["./hits.component.scss"],
})
export class HitsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() hits;
  @Input() results;
  @Input() refine;

  private results$: Subject<any> = new Subject();
  private results$Subscription: Subscription;
  private groupsAlgoliaIndex = environment.ALGOLIA_GROUPS_INDEX;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    console.log(this.groupsAlgoliaIndex);
    // send analytics on URL param search
    if (this.results.hits !== undefined && this.results.query !== "") {
      this.analyticsService.trackSearch(
        this.results.query,
        this.results.hits.length
      );
    }

    this.results$Subscription = this.results$
      .pipe(debounceTime(1500))
      .subscribe((res) => {
        if (res.query.length > 0 && res.query !== "") {
          this.analyticsService.trackSearch(res.query, res.count);
        }
      });
  }

  ngOnChanges(changes) {
    if (changes.results && !changes.results.firstChange) {
      const curQuery = changes.results.currentValue.query;
      const curCount = changes.results.currentValue.hits.length;
      this.results$.next({ query: curQuery, count: curCount });
    }
  }

  ngOnDestroy() {
    this.results$Subscription.unsubscribe();
  }

  public handleHitClick(event: any) {
    let target: any, position: number, isWidget: boolean;
    const targetEl = event.composedPath().find(this.isParent);
    const targetId = targetEl.dataset.hitId;

    for (let i = 0; i < this.results.hits.length; i += 1) {
      if (
        this.results.hits[i].objectID.toLowerCase() === targetId.toLowerCase()
      ) {
        target = this.results.hits[i];
        position = i + 1;
        isWidget = this.isSearchWidget(targetEl);
      }
    }

    this.analyticsService.trackConversion(
      this.results.query,
      target,
      position,
      isWidget
    );
  }

  private isSearchWidget(el) {
    return el.classList.contains("hit-widget") ? true : false;
  }

  private isParent(el) {
    if (el.outerHTML.includes("data-hit-id")) {
      return el;
    }
  }
}
