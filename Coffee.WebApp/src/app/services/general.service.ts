import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InitModel } from 'src/models/init.model';

@Injectable({
    providedIn: "root"
})
export class GeneralService {
    constructor(private http: HttpClient) { }

    init(): Observable<InitModel> {
        const URL = "/api/init";
        return this.http.get<{ response: InitModel }>(URL, this.options(this.json())).pipe(map(v => v.response || null));
    }
    private options(headers?: HttpHeaders) {
        return { withCredentials: true, headers };
    }
    private json(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        });
    }
}
