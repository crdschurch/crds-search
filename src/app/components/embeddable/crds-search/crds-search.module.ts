import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';
import { HitsComponent } from '../../../components/hits/hits.component';
import { HitComponent } from '../../../components/hit/hit.component';
import { SuggestedComponent } from '../../../components/suggested/suggested.component';
import { TabFilter } from '../../../components/tab-filter/tab-filter.component';
import { NoResultsComponent } from '../../../components/no-results/no-results.component';
import { HitTextComponent } from '../../../components/hit-text/hit-text.component';
import { HitWidgetComponent } from '../../../components/hit-widget/hit-widget.component';
import { SearchComponent } from '../../../components/search/search.component';
import { ParseMarkdownPipe } from '../../../pipes/parseMarkdown.pipe';
import { NgAisModule } from 'angular-instantsearch';

import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { Angulartics2Segment } from 'angulartics2/segment';

@NgModule({
    declarations: [
        ParseMarkdownPipe,
        SearchInputComponent,
        HitsComponent,
        HitComponent,
        SuggestedComponent,
        TabFilter,
        NoResultsComponent,
        HitTextComponent,
        HitWidgetComponent,
        SearchComponent,
        SearchModalComponent
    ],
    imports: [
        NgAisModule.forRoot(),
        CommonModule,
        BrowserModule,
        Angulartics2RouterlessModule.forRoot([
            Angulartics2GoogleAnalytics,
            Angulartics2GoogleTagManager,
            Angulartics2Segment
        ])
    ],
    providers: [],
    entryComponents: [
        SearchModalComponent
    ],
    exports: [SearchModalComponent, SearchComponent]
})
export class CrdsSearchModule {
    constructor(private injector: Injector) {

    }
}
