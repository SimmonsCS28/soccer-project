import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerSearchComponent implements OnInit {
@ViewChild('playerSearchForm') public playerSearchForm: NgForm;


  constructor() { }

  ngOnInit() {
  }

  public playerSearchSubmit (){
    console.log(this.playerSearchForm.value.noExpPref);
  }
}
