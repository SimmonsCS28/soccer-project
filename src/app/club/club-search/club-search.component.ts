import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { ClubSearchService } from './club-search.service';
import { Club } from '../club-model'

@Component({
  selector: 'app-club-search',
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClubSearchComponent implements OnInit {
  @ViewChild('clubSearchForm') public clbSrchForm: NgForm

  public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";
  public clubs: Club[];
  public formToggle: Boolean = false;

  constructor(
    private http: Http,
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
    
    console.log(this.clubs);
  }

  public toggleForm() {
    this.formToggle = false;
  }

  public resetTable() {
    this.clubs = undefined;
  }
}
