import { NgForm } from '@angular/forms';
import { Injectable } from "@angular/core";
import { Club } from "../club-model";
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'
import { ClubSearchModel } from "./club-search.model";


@Injectable()
export class ClubSearchService {

    public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

    constructor(private http: Http) {
    }

    public getClubsBySearchForm(searchInput: string): Observable<Club[]> {
        return this.http.get(this.url, { params: searchInput }).map((res: Response) => {
            return res.json();
        }).catch((err: Error) =>{
            return Observable.throw('The server returned an error message ' + err.message);
        })
    }

    public getClub(club: ClubSearchModel): Observable<Club> {
        return this.http.get(this.url, {params: club}).map((res: Response) => {
            return res.json();
        }).catch((err: Error) => {
            return Observable.throw('The server returned an error message ' + err.message);
        })
    }

    public getSearchCriteria(srchForm: any): Array<string> {
        let searchCriteria = new Array<string>();
        if (srchForm.goals !== ''){
            if (srchForm.goals === '1') {
                searchCriteria.push("Overall Top Scorers");
            }
            if (srchForm.goals === '2') {
                searchCriteria.push("Overall Top Goals Per Game");
            }
            if (srchForm.goals === '0') {
                searchCriteria.push("No Scorer Preference");
            }
        }
        if (srchForm.disc !== ''){
            if (srchForm.disc === '1') {
                searchCriteria.push("Overall Top Discipline");
            }
            if (srchForm.disc === '2') {
                searchCriteria.push("Overall Top Discipline Per Game");
            }
            if (srchForm.disc === '3') {
                searchCriteria.push("Overall Least Discipline");
            }
            if (srchForm.disc === '4') {
                searchCriteria.push("Overall Least Discipline Per Game");
            }
            if (srchForm.disc === '0') {
                searchCriteria.push("No Discipline Preference");
            }
        }
        if (srchForm.xp !== ''){
            if (srchForm.xp === '1') {
                searchCriteria.push("Most Experienced");
            }
            if (srchForm.xp === '2') {
                searchCriteria.push("Least Experienced");
            }
            if (srchForm.xp === '0') {
                searchCriteria.push("No Preference");
            }
        }
        return searchCriteria;
    }
}
