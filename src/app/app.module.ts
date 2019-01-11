import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HitsComponent } from './components/hits/hits.component';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { VideoHitComponent } from './components/video-hit/video-hit.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavTabsComponent,
    SearchInputComponent,
    HitsComponent,
    VideoHitComponent
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
