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
        console.log(searchInput);
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
}
