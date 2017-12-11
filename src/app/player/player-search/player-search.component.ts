import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response, Http } from '@angular/http'
import { PlayerSearchService } from './player-search-service';
import { RequestMethod } from '@angular/http/src/enums';
import { HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Player } from '../player-model';
import { PlayerSearchModel } from './player-search.model';
import { Club } from '../../club/club-model';
import { ClubSearchService } from '../../club/club-search/club-search.service';
import { ClubSearchModel } from '../../club/club-search/club-search.model';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSearchComponent implements OnInit {

  @ViewChild('playerSearchForm') public playerSearchForm: NgForm;

  public playerSearchObject = new PlayerSearchModel();
  public players: Player[] = new Array();
  public clubs: Club[];
  public clubSearchObject = new ClubSearchModel();
  public individualClub = new Club();
  public player: Player = new Player();

  public formToggle: Boolean = false;
  public clubFound: Boolean = false;
  public resultsToggle: Boolean = false;

  public searchCriteria: Array<string>;

  constructor(
    private http: Http,
    private playerService: PlayerSearchService,
    private clubService: ClubSearchService, ) { }

  ngOnInit() {
  }

  public playerSearchSubmit() {
    this.playerSearchForm.value.type = 'byplayer';
    this.playerService.getPlayersBySearchForm(this.playerSearchForm.value).subscribe((res: Club[]) => {
      this.handleSearchResponse(res);
    });
  }

  private handleSearchResponse(resp: Club[]) {
    if (resp) {
      this.clubs = resp;
      this.searchCriteria = new Array<string>();
      this.searchCriteria = this.clubService.getSearchCriteria(this.playerSearchForm.value);
      this.formToggle = true;
      this.resultsToggle = true;
    }
  }

  public getPlayer(pName: string) {
    this.playerSearchObject.type = "playerstats";
    this.playerSearchObject.player = pName;
    this.playerService.getPlayerStats(this.playerSearchObject).subscribe((res: Player) => {
      if (res) {
        this.player.playerName = res[0].playerName;
        this.player.position = res[0].position;
        this.player.goalsScored = res[0].goalsScored;
        this.player.gamesPlayed = res[0].gamesPlayed;
        this.player.redCards = res[0].redCards;
        this.player.yellowCards = res[0].yellowCards;
      }
    });
  }

  private getPlayerInfo(cName: string, pName: string) {
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
    this.getPlayer(pName);
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
    this.players = undefined;
  }
}
