import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-club-search',
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClubSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clubSearch() {
    console.log('test club search');
  }

}
