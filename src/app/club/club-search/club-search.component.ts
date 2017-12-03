import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-club-search',
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClubSearchComponent implements OnInit {
  @ViewChild('clubSearchForm') public clbSrchForm: NgForm

  public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  clubSearchSubmit() {
    console.log(this.clbSrchForm.value);
    this.http.get(this.url, this.clbSrchForm.value.leastExp).subscribe(resp => {
      console.log(resp);
    },
  (error: HttpErrorResponse) => {
    if (error.error instanceof Error) {
      console.log('The following error occurred:', error.error.message);
    } else {
      console.log('Server returned an error code ' + error.status + ' body was: ' + error.message);
    }
  })
  }

}
