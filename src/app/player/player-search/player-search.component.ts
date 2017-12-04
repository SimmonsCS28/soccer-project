import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PlayerSearchService } from './player-search-service';
import { RequestMethod } from '@angular/http/src/enums';
import { HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Player } from '../player-model';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSearchComponent implements OnInit {

  @ViewChild('playerSearchForm') public playerSearchForm: NgForm;

  constructor(
    private http: HttpClient,
    private playerService: PlayerSearchService) { }

  ngOnInit() {
  }

  public playerSearchSubmit() {
    this.playerSearchForm.value.type = 'byplayer';
    this.playerService.getPlayersBySearchForm(this.playerSearchForm.value).subscribe((res: Player[]) => {
      this.handlePlayerResults(res);
    });
  }

  private handlePlayerResults(players: Player[]) {
    console.log(players);
  }
}
