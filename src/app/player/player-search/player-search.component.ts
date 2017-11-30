import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PlayerSearchService } from './player-search-service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSearchComponent implements OnInit {

  @ViewChild('playerSearchForm') public playerSearchForm: NgForm;
  public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

  public response: any;

  constructor(
    private http: HttpClient,
    private playerService: PlayerSearchService) { }

  ngOnInit() {
  }

  public playerSearchSubmit() {

    // this.playerService.getPlayersBySearchForm();
    console.log(this.playerSearchForm.value);
    this.response = this.http.get(this.url).subscribe((res: Response) => {
      res.json();
    })
  }
}
