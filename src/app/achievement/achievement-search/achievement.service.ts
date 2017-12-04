import { Achievement } from './../achivement-model';
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'


@Injectable()
export class AchievementService {

    public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

    constructor(private http: Http) {
    }

    public getAchievementsBySearchForm(searchInput: string): Observable<Achievement[]> {
        console.log(searchInput);
        return this.http.get(this.url, { params: searchInput }).map((res: Response) => {
            return res.json();
        }).catch((err: Error) =>{
            return Observable.throw('The server returned an error message ' + err.message);
        })
    }
}
