
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DBService {
    constructor (private http: Http) {
    }
    storeServers(servers: any[]) {
        // this.http.get('http://washington.uww.edu')
    }
}