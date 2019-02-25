import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';
import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { Angulartics2Segment } from 'angulartics2/segment';

import { ParseMarkdownPipe } from './pipes/parseMarkdown.pipe';
import { AppComponent } from './app.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HitsComponent } from './components/hits/hits.component';
import { HitComponent } from './components/hit/hit.component';
import { SuggestedComponent } from './components/suggested/suggested.component';
import { TabFilter } from './components/tab-filter/tab-filter.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { HitTextComponent } from './components/hit-text/hit-text.component';
import { HitWidgetComponent } from './components/hit-widget/hit-widget.component'

@NgModule({
  declarations: [
    ParseMarkdownPipe,
    AppComponent,
    SearchInputComponent,
    HitsComponent,
    HitComponent,
    SuggestedComponent,
    TabFilter,
    NoResultsComponent,
    HitTextComponent,
    HitWidgetComponent
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    Angulartics2RouterlessModule.forRoot([
      Angulartics2GoogleAnalytics,
      Angulartics2GoogleTagManager,
      Angulartics2Segment
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
