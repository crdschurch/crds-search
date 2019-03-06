import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CrdsSearchModule } from '../app/components/embeddable/crds-search/crds-search.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CrdsSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class AppModule { 

}
