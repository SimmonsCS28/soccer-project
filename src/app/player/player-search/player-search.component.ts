import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSearchComponent implements OnInit {

  @ViewChild('playerSearchForm') public playerSearchForm: NgForm;
  public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public playerSearchSubmit() {
    console.log(this.playerSearchForm.value.noExpPref);
    this.http.get(this.url).subscribe(response => {
      console.log(response);
    }),
      (err: HttpErrorResponse) => {
        console.log(err);
      };
  }
}
