import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-hit',
  templateUrl: './author-hit.component.html',
  styleUrls: ['./author-hit.component.scss']
})
export class AuthorHitComponent implements OnInit {
  @Input() hit;
  @Input() results;
  constructor() { }

  ngOnInit() {
  }

}
