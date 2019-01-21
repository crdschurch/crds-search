import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HitsComponent } from './components/hits/hits.component';
import { HitComponent } from './components/hit/hit.component';
import { VideoHitComponent } from './components/video-hit/video-hit.component';
import { SuggestedComponent } from './components/suggested/suggested.component';
import { ArticleHitComponent } from './components/article-hit/article-hit.component';
import { FilterUniquePipe } from './filterUnique.pipe';
import { MessageHitComponent } from './components/message-hit/message-hit.component';
import { SeriesHitComponent } from './components/series-hit/series-hit.component';
import { LocationHitComponent } from './components/location-hit/location-hit.component';
import { RefinementList } from './components/refinement-list/refinement-list.component';
import { EpisodeHitComponent } from './components/episode-hit/episode-hit.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchInputComponent,
    HitsComponent,
    HitComponent,
    SuggestedComponent,
    FilterUniquePipe,
    ArticleHitComponent,
    EpisodeHitComponent,
    LocationHitComponent,
    MessageHitComponent,
    SeriesHitComponent,
    VideoHitComponent,
    RefinementList
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
