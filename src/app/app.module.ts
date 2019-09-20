import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { SearchModalComponent } from './components/embeddable/search-modal/search-modal.component';
import { AppComponent } from './app.component';
import { CrdsSearchModule } from '../app/components/embeddable/crds-search/crds-search.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CrdsSearchModule
  ],
  entryComponents: [AppComponent],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap(appRef) {
    if (environment.package_component) {
      const el = createCustomElement(SearchModalComponent, { injector: this.injector });
      customElements.define('crds-search', el);
    } else {
      appRef.bootstrap(AppComponent);
    }
  }
}
