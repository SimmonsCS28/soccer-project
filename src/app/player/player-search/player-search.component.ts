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
      this.formToggle = true;
    }
  }

  public getPlayer(pName: string) {
    this.playerSearchObject.type = "getplayers";
    this.playerSearchObject.playerName = pName;
    this.playerService.getPlayerStats(this.playerSearchObject).subscribe((res: Player[]) => {
      this.players = res;
      this.player = this.players.find(player => player.playerName === this.playerSearchObject.playerName);
    })
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
        this.clubs = undefined;
      }
    });
  }

  public toggleForm() {
    this.formToggle = false;
    this.clubFound = false;
  }

  public resetTable() {
    this.players = undefined;
  }
}
