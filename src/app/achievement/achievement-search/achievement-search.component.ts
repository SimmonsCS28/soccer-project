import { Achievement } from './../achivement-model';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AchievementService } from './achievement.service';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ClubSearchModel } from '../../club/club-search/club-search.model';
import { ClubSearchService } from '../../club/club-search/club-search.service';
import { Club } from '../../club/club-model';

@Component({
  selector: 'app-achievement-search',
  templateUrl: './achievement-search.component.html',
  styleUrls: ['./achievement-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AchievementSearchComponent implements OnInit {
  @ViewChild('achievementSearchForm') public asf: NgForm

  public clubSearchObject = new ClubSearchModel();
  public individualClub = new Club();
  public clubs: Club[];

  public achievements: Achievement[];
  public formToggle: Boolean = false;
  public clubFound: Boolean = false;

  constructor(
    private http: Http,
    private clubService: ClubSearchService,
    private achievementService: AchievementService) {
  }

  ngOnInit() {
  }

  achievementSearchSubmit() {
    this.asf.value.type = 'byachievement';
    this.achievementService.getAchievementsBySearchForm(this.asf.value).subscribe((resp: Club[]) => {
      this.handleSearchResponse(resp);
    })
  }

  private handleSearchResponse(resp: Club[]) {
    if(resp){
      this.clubs = resp;
      this.formToggle = true;
    }
    
    console.log(this.clubs);
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
      }
    });

  }

  public toggleForm() {
    this.formToggle = false;
    this.clubFound = false;
  }

  public resetTable() {
    this.achievements = undefined;
  }
}
