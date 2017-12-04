import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MiscSearchService } from './misc-search.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-misc-search',
  templateUrl: './misc-search.component.html',
  styleUrls: ['./misc-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MiscSearchComponent implements OnInit {

  @ViewChild('miscSearchForm') public miscSearchForm: NgForm;
  public misc: any[];
  public formToggle: Boolean = false;

  constructor(
    private http: Http,
    private miscService: MiscSearchService) { }

  ngOnInit() {
  }
  public miscSearchSubmit() {
    this.miscSearchForm.value.type = 'bymisc';
    this.miscService.getByMisc(this.miscSearchForm.value).subscribe((res: any[]) => {
      this.handlePlayerResults(res);
    });
  }

  private handlePlayerResults(resp: any[]) {
    console.log(resp);
    if (resp) {
      this.misc = resp;
      this.formToggle = true;
    }
  }

  public toggleForm() {
    this.formToggle = false;
  }

  public resetTable() {
    this.misc = undefined;
  }

}
