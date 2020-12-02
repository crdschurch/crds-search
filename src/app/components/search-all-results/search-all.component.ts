import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { SearchService } from "../../services/search.service";
import { NativeWindowRefService } from "../../services/native-window-ref.service";
import { Angulartics2Segment } from "angulartics2/segment";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
  selector: "app-search-all",
  templateUrl: "./search-all.component.html",
  styleUrls: ["./search-all.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponentAll implements OnInit {
  @Input() routingEnabled: boolean;
  @Input() contentType: string;
  public config;

  constructor(
    private searchService: SearchService,
    private windowRef: NativeWindowRefService,
    private angulartics2Segment: Angulartics2Segment,
    private angulartics2GA: Angulartics2GoogleAnalytics,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.config = this.searchService.configAlgolia(false, this.contentType);
  }
}
