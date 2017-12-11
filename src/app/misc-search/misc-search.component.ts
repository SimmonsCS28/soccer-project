import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MiscSearchService } from './misc-search.service';
import { NgForm } from '@angular/forms';
import { Club } from '../club/club-model';
import { ClubSearchModel } from '../club/club-search/club-search.model';
import { ClubSearchService } from '../club/club-search/club-search.service';

@Component({
  selector: 'app-misc-search',
  templateUrl: './misc-search.component.html',
  styleUrls: ['./misc-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MiscSearchComponent implements OnInit {

  @ViewChild('miscSearchForm') public miscSearchForm: NgForm;

  public clubSearchObject = new ClubSearchModel();
  public clubs: Club[];
  public individualClub = new Club();
  public clubFound: Boolean = false;
  public formToggle: Boolean = false;
  public resultsToggle: Boolean = false;

  public teamColor = { color: '' };
  public teamColors = [
    { color: 'red' },
    { color: 'black' },
    { color: 'blue' },
    { color: 'white' },
    { color: 'yellow' },
    { color: 'burgundy' },
    { color: 'orange' },
    { color: 'gray' },
    { color: 'purple' },
    { color: 'green' },
    { color: 'gold' },];

  public regions = [{ region: 'United States/Canada' }, { region: 'Spain' }, { region: 'United Kingdom' }]

  constructor(
    private http: Http,
    private miscService: MiscSearchService,
    private clubService: ClubSearchService) { }

  ngOnInit() {
  }
  public miscSearchSubmit() {
    this.miscSearchForm.value.type = 'bymisc';
    this.miscService.getByMisc(this.miscSearchForm.value).subscribe((res: any[]) => {
      this.handlePlayerResults(res);
    });
  }

  private handlePlayerResults(resp: any[]) {
    console.log(resp);
    if (resp) {
      this.clubs = resp;
      this.formToggle = true;
      this.resultsToggle = true;
    }
  }

  private getClub(cName: string) {
    this.clubSearchObject.type = 'getclub';
    // const encodedClubName: string = encodeURIComponent(cName);
    // console.log(encodedClubName);
    this.clubSearchObject.team = cName;
    this.clubService.getClub(this.clubSearchObject).subscribe((res: Club) => {
      if (res) {
        this.individualClub.clubName = res[0].clubName;
        this.individualClub.colors = res[0].colors;
        this.individualClub.leagueName = res[0].leagueName;
        this.individualClub.worldRanking = res[0].worldRanking;
        this.individualClub.website = res[0].website;
        this.individualClub.logo = res[0].logo;
        this.clubFound = true;
        this.resultsToggle = false;
      }
    });
  }

  public toggleForm() {
    this.formToggle = false;
    this.clubFound = false;
    this.resultsToggle = false;
  }

  public toggleResults() {
    this.resultsToggle = true;
  }

  public resetTable() {
    this.clubs = undefined;
  }

}
