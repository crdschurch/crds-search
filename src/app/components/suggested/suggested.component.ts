import {Component, OnInit} from '@angular/core';
import {ContentfulService} from 'src/app/contentful.service';

@Component({selector: 'app-suggested', templateUrl: './suggested.component.html', styleUrls: ['./suggested.component.scss']})

export class SuggestedComponent implements OnInit {
  private content$;
  constructor(private contentService : ContentfulService) {
    console.log(this.contentService);
  }

  ngOnInit() {
    this.content$ = this.contentService.getContentBlock('2l2IrgFvciN84qnwfkMCtI');
  }
}
