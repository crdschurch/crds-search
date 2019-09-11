import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { NativeWindowRefService } from '../../services/native-window-ref.service';
import { Angulartics2Segment } from 'angulartics2/segment';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AnalyticsService } from '../../services/analytics.service';

@Component({ selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.scss'], encapsulation: ViewEncapsulation.None })

export class SearchComponent implements OnInit {
    @Input() routingEnabled: boolean;
    public config;
    constructor(
        private searchService: SearchService,
        private windowRef: NativeWindowRefService,
        private angulartics2Segment: Angulartics2Segment,
        private angulartics2GA: Angulartics2GoogleAnalytics,
        private analyticsService: AnalyticsService
    ) {

    }

    ngOnInit() {
        this.config = this.searchService.configAlgolia(this.routingEnabled);
    }
}
