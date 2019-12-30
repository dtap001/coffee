import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/models/general.response';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers'
import { TargetModel } from 'src/models/target.model';
import { TargetsSearchResponse, TargetsDeleteResponse, TargetsSaveResponse, TargetsWakeResponse } from 'src/models/targets.responses';

@Injectable({
    providedIn: "root"
})
export class GeneralService {
    constructor(private http: HttpClient) {
    }

    hello(): Observable<GeneralResponse> {
        const URL = "http://localhost:3000/v1/hello";
        return this.http.get<GeneralResponse>(URL, this.options(this.json()));
    }

    login(userName: string, password: string): Observable<GeneralResponse> {
        const URL = "http://localhost:3000/v1/user/login";
        let response$ = this.http.post<GeneralResponse>(URL, { user: userName, password: password }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsSearch(search: string): Observable<TargetsSearchResponse> {
        const URL = "http://localhost:3000/v1/targets/search";
        let response$ = this.http.post<TargetsSearchResponse>(URL, { search: search }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsDelete(id: number): Observable<TargetsDeleteResponse> {
        const URL = "http://localhost:3000/v1/targets/delete";
        let response$ = this.http.post<TargetsDeleteResponse>(URL, { id: id }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsSave(target: TargetModel): Observable<TargetsSaveResponse> {
        const URL = "http://localhost:3000/v1/targets/save";
        let response$ = this.http.post<TargetsSaveResponse>(URL, { target: target }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsWake(id: number): Observable<TargetsWakeResponse> {
        const URL = "http://localhost:3000/v1/targets/wake";
        let response$ = this.http.post<TargetsWakeResponse>(URL, { id: id }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    private wrapWithIsOKCheck(response$: Observable<GeneralResponse>): Observable<GeneralResponse> {
        let result$ = new Observable<GeneralResponse>(observer => {
            response$.subscribe(response => {
                if (!response.isOK) {
                    return observer.error(response);
                }
                return observer.next(response)
            });
        });
        return result$
    }


    private options(headers?: HttpHeaders) {
        return { withCredentials: true, headers };
    }

    private json(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': ["http://localhost:4200", "http://localhost:3000"],
        });
    }
}
