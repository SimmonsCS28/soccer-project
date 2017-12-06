import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, } from '@angular/core';
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
  @Output()sendClubDetails: EventEmitter<Club> = new EventEmitter<Club>();

  public clubSearchObject = new ClubSearchModel();

  public clubs: Club[];
  public individualClub = new Club();
  public formToggle: Boolean = false;
  public clubFound: Boolean = false;

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
  }

  private getClub(cName: string) {
    this.clubSearchObject.type = 'getclub';
    // const encodedClubName: string = encodeURIComponent(cName);
    // console.log(encodedClubName);
    this.clubSearchObject.team = cName;
    this.clubService.getClub(this.clubSearchObject).subscribe((res: Club) => {
      if(res) {
        this.individualClub.clubName = res[0].clubName;
        this.individualClub.colors = res[0].colors;
        this.individualClub.leagueName = res[0].leagueName;
        this.individualClub.worldRanking = res[0].worldRanking;
        this.individualClub.website = res[0].website;
        this.individualClub.logo = res[0].logo;
        this.clubFound = true;
        this.clubs = undefined;
        this.sendClubDetails.emit(res);
      }
    });

  }

  public toggleForm() {
    this.formToggle = false;
    this.clubFound = false;
  }

  public resetTable() {
    this.clubs = undefined;
  }
}
