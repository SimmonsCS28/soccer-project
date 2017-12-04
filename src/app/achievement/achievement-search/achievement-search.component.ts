import { Achievement } from './../achivement-model';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AchievementService } from './achievement.service';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-achievement-search',
  templateUrl: './achievement-search.component.html',
  styleUrls: ['./achievement-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AchievementSearchComponent implements OnInit {
  @ViewChild('achievementSearchForm') public asf: NgForm

  public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";
  public achievements: Achievement[];
  public formToggle: Boolean = false;

  constructor(
    private http: Http,
    private achievementService: AchievementService) {
  }

  ngOnInit() {
  }

  achievementSearchSubmit() {
    this.asf.value.type = 'byachievement';
    this.achievementService.getAchievementsBySearchForm(this.asf.value).subscribe((resp: Achievement[]) => {
      this.handleSearchResponse(resp);
    })
  }

  private handleSearchResponse(resp: Achievement[]) {
    if(resp){
      this.achievements = resp;
      this.formToggle = true;
    }
    
    console.log(this.achievements);
  }

  public toggleForm() {
    this.formToggle = false;
  }

  public resetTable() {
    this.achievements = undefined;
  }
}
