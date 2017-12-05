import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ClubSearchService } from './club-search.service';
import { Club } from '../club-model'
import { ClubSearchModel } from './club-search.model';

@Component({
  selector: 'app-club-search',
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClubSearchComponent implements OnInit {
  @ViewChild('clubSearchForm') public clbSrchForm: NgForm

  public clubSearchObject = new ClubSearchModel();

  public clubs: Club[];
  public formToggle: Boolean = false;

  constructor(
    private clubService: ClubSearchService) {
  }

  ngOnInit() {
  }

  clubSearchSubmit() {
    this.clbSrchForm.value.type = 'byclub';
    this.clubService.getClubsBySearchForm(this.clbSrchForm.value).subscribe((resp: Club[]) => {
      this.handleClubSearchResponse(resp);
    })
  }

  private handleClubSearchResponse(resp: Club[]) {
    if(resp){
      this.clubs = resp;
      this.formToggle = true;
    }
    
    console.log(this.clubs[1].club);
  }

  private getClub() {
    this.clubSearchObject.type = 'getclub';
    const encodedClubName: string = encodeURIComponent('Athletic Bilbao');
    this.clubSearchObject.clubName = encodedClubName;
    this.clubService.getClub(this.clubSearchObject).subscribe((res: Club) => {
      console.log(res);
    });

  }

  public toggleForm() {
    this.formToggle = false;
  }

  public resetTable() {
    this.clubs = undefined;
  }
}
