import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchModalComponent } from "../search-modal/search-modal.component";
import { SearchInputComponent } from "../../../components/search-input/search-input.component";
import { HitsComponent } from "../../../components/hits/hits.component";
import { HitComponent } from "../../../components/hit/hit.component";
import { SuggestedComponent } from "../../../components/suggested/suggested.component";
import { TabFilterComponent } from "../../../components/tab-filter/tab-filter.component";
import { NoResultsComponent } from "../../../components/no-results/no-results.component";
import { HitTextComponent } from "../../../components/hit-text/hit-text.component";
import { HitWidgetComponent } from "../../../components/hit-widget/hit-widget.component";
import { SearchComponent } from "../../../components/search/search.component";
import { ParseMarkdownPipe } from "../../../pipes/parseMarkdown.pipe";
import { NgAisModule } from "angular-instantsearch";
import { ImgixAspectRatioPipe } from "../../../pipes/imgix-aspect-ratio.pipe";

import { Angulartics2RouterlessModule } from "angulartics2/routerlessmodule";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { Angulartics2GoogleTagManager } from "angulartics2/gtm";
import { Angulartics2Segment } from "angulartics2/segment";
import { SearchHeaderComponent } from '../../../components/search-header/search-header.component';
import { SortBy } from '../../sort-by/sort-by.component';
import { SearchComponentAll } from '../../search-all-results/search-all.component';

@NgModule({
  declarations: [
    ParseMarkdownPipe,
    SearchInputComponent,
    HitsComponent,
    HitComponent,
    SuggestedComponent,
    TabFilterComponent,
    NoResultsComponent,
    HitTextComponent,
    HitWidgetComponent,
    SearchComponent,
    SearchModalComponent,
    ImgixAspectRatioPipe,
    SearchHeaderComponent,
    SearchComponentAll,
    SortBy
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    NgAisModule.forRoot(),
    CommonModule,
    BrowserModule,
    Angulartics2RouterlessModule.forRoot([
      Angulartics2GoogleAnalytics,
      Angulartics2GoogleTagManager,
      Angulartics2Segment,
    ]),
  ],
  providers: [],
  entryComponents: [SearchModalComponent],
  exports: [SearchModalComponent, SearchComponent],
})
export class CrdsSearchModule {
  constructor(
    private injector: Injector,
    private angulartics2GoogleTagManager: Angulartics2GoogleTagManager
  ) {}
}
