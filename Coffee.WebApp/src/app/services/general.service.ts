import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InitModel } from 'src/models/init.model';
import { GeneralResponse } from 'src/models/general.response';

@Injectable({
    providedIn: "root"
})
export class GeneralService {
    constructor(private http: HttpClient) { }

    hello(): Observable<GeneralResponse> {
        const URL = "http://localhost:3000/v1/hello";
        return this.http.get<GeneralResponse>(URL, this.options(this.json()));
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
