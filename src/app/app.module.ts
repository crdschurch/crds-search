import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    SearchComponent,
    NavTabsComponent
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
