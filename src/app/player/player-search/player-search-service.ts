import { Injectable } from "@angular/core";
import { Player } from "../player-model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class PlayerSearchService {

    public url: string = "http://washington.uww.edu/cs366/houshce29/db/data_fetch.php";

    constructor(private http: HttpClient){

    }

    // public getPlayersBySearchForm: Player () {
    //     return this.http.get(this.url)
    // }
}
