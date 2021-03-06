import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.scss']
})
export class SuggestedComponent implements OnInit {
  @Input() results;

  public content$;

  constructor(private contentService: ContentfulService) { }

  ngOnInit() {
    this.content$ = this.contentService.getSuggestedContentBlock();
  }
}
