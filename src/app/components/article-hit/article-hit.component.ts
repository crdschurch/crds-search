import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-hit',
  templateUrl: './article-hit.component.html',
  styleUrls: ['./article-hit.component.scss']
})
export class ArticleHitComponent implements OnInit {
  @Input() hit;
  constructor() { }

  ngOnInit() {
  }

}
