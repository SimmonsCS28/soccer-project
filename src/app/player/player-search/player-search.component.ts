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
  public player: Player = new Player();
  public formToggle: Boolean = false;

  constructor(
    private http: Http,
    private playerService: PlayerSearchService) { }

  ngOnInit() {
  }

  public playerSearchSubmit() {
    this.playerSearchForm.value.type = 'byplayer';
    this.playerService.getPlayersBySearchForm(this.playerSearchForm.value).subscribe((res: Player[]) => {
      this.handlePlayerResults(res);
    });
  }

  private handlePlayerResults(resp: Player[]) {
    console.log(resp);
    if(resp){
      this.players = resp;
      this.formToggle = true;
    }
  }

  public getPlayer(pName: string){
    this.playerSearchObject.type = "getplayers";
    this.playerSearchObject.playerName = pName;
    this.playerService.getPlayerStats(this.playerSearchObject).subscribe((res: Player[]) => {
      this.players = res;
      console.log(this.players);
      this.player = this.players.find(player => player.playerName === this.playerSearchObject.playerName);
      console.log(this.players.find(player => player.playerName === this.playerSearchObject.playerName));
    })
  }

  public toggleForm() {
    this.formToggle = false;
  }

  public resetTable() {
    this.players = undefined;
  }
}
