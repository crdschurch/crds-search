import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { SearchService }  from './services/search.service';
import { NativeWindowRefService } from './services/native-window-ref.service';
import { Angulartics2Segment } from 'angulartics2/segment';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public config;
  constructor(
    private searchService : SearchService,
    private windowRef: NativeWindowRefService,
    private angulartics2Segment: Angulartics2Segment,
    private angulartics2GA: Angulartics2GoogleAnalytics,
    private analyticsService: AnalyticsService
    ) {
  }

  ngOnInit() {
    this.config = this.searchService.configAlgolia();
    this.initHeaderFooter();
  }

  private initHeaderFooter() {
    const CRDS = this.windowRef.nativeWindow.CRDS;
    const { apiEndpoint, appEndpoint, cmsEndpoint, crdsEnv } = environment;

    (function() {
      var options: any = {};
      options.cmsEndpoint = cmsEndpoint + '/';
      options.appEndpoint = appEndpoint + '/';
      options.imgEndpoint = `${apiEndpoint}/gateway/api/image/profile/`;
      options.crdsCookiePrefix = crdsEnv;

      // header
      var header = new CRDS.SharedHeader(options);
      header.render();

      // footer
      new CRDS.SharedFooter(options);
    })();
  }
}
