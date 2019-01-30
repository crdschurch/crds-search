import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { SearchService }  from './services/search.service';
import { NativeWindowRefService } from './services/native-window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public config;
  constructor(private searchService : SearchService, private windowRef: NativeWindowRefService) {
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
