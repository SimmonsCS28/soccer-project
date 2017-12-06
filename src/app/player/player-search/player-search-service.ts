import { Injectable } from "@angular/core";
import { Player } from "../player-model";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'
import { PlayerSearchModel } from "./player-search.model";


@Injectable()
export class PlayerSearchService {

    public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

    constructor(private http: Http) {
    }

    public getPlayersBySearchForm(searchInput: string): Observable<Player[]> {
        console.log(searchInput);
        return this.http.get(this.url, { params: searchInput }).map((res: Response) => {
            return res.json();
        }).catch((err: Error) =>{
            return Observable.throw('The server returned an error message ' + err.message);
        })
    }

    public getPlayerStats(searchInput: PlayerSearchModel): Observable<Player[]> {
        return this.http.get(this.url, { params: searchInput }).map((res: Response) => {
            return res.json();
        }).catch((err: Error) => {
            return Observable.throw('The server returned an error message ' + err.message)
        })
    }
}
