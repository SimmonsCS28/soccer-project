import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Club } from './club-model';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClubComponent implements OnInit {

  public club = new Club();

  constructor() { }

  ngOnInit() {
  }

  public handleClubInfo(clubInput: Club) {
    console.log('test')
    this.club = clubInput;
  }

}
