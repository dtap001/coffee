import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/models/general.response';
import { Store, State } from '@ngrx/store';
import * as fromRoot from '../../store/reducers'
import { TargetModel } from 'src/models/target.model';
import { TargetsSearchResponse, TargetsDeleteResponse, TargetsSaveResponse, TargetsWakeResponse, TargetsGetPinnedResponse } from 'src/models/targets.responses';
import { DiscoveryStopResponse, DiscoveryStartResponse, DiscoveryGetInterfacesResponse } from 'src/models/discovery.responses';
import { SettingsModel } from 'src/models/settings.model';
import { SettingsGetResponse, SettingsSaveResponse } from 'src/models/settings.responses';
import { Actions, ofType, act } from '@ngrx/effects';
import { HelloSuccessAction } from 'src/store/hello/hello.action';

@Injectable({
    providedIn: "root"
})
export class GeneralService {
    _v: string;
    constructor(private actions$: Actions, private http: HttpClient, private state: State<fromRoot.CoffeeState>) {
        actions$.pipe(
            ofType(HelloSuccessAction),
        ).subscribe(action => { this._v = action.payload.ApiVersion });
    }

    getURL() {
        //return window.location.origin + "/" + this.state.getValue().hello.data.ApiVersion;
        return "http://localhost:3000/api/" + this._v;
    }

    hello(): Observable<GeneralResponse> {
        const URL = "http://localhost:3000/api" + "/hello";
        return this.http.get<GeneralResponse>(URL, this.options(this.json()));
    }

    login(userName: string, password: string): Observable<GeneralResponse> {
        const URL = this.getURL() + "/user/login";
        let response$ = this.http.post<GeneralResponse>(URL, { user: userName, password: password }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    userSave(id: number, userName: string, password: string): Observable<GeneralResponse> {
        const URL = this.getURL() + "/user/save";
        let response$ = this.http.post<GeneralResponse>(URL, { id: id, userName: userName, password: password }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsSearch(search: string): Observable<TargetsSearchResponse> {
        const URL = this.getURL() + "/targets/search";
        let response$ = this.http.post<TargetsSearchResponse>(URL, { search: search }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsDelete(id: number): Observable<TargetsDeleteResponse> {
        const URL = this.getURL() + "/targets/delete";
        let response$ = this.http.post<TargetsDeleteResponse>(URL, { id: id }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsSave(target: TargetModel): Observable<TargetsSaveResponse> {
        const URL = this.getURL() + "/targets/save";
        let response$ = this.http.post<TargetsSaveResponse>(URL, { target: target }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    targetsWake(id: number): Observable<TargetsWakeResponse> {
        const URL = this.getURL() + "/targets/wake";
        let response$ = this.http.post<TargetsWakeResponse>(URL, { id: id }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }
    targetsPin(id: number): Observable<GeneralResponse> {
        const URL = this.getURL() + "/targets/pin";
        let response$ = this.http.post<GeneralResponse>(URL, { id: id }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }
    targetsGetPinned(): Observable<TargetsGetPinnedResponse> {
        const URL = this.getURL() + "/targets/getPinned";
        let response$ = this.http.get<TargetsGetPinnedResponse>(URL, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }
    targetsWakePinned(id: number, pinCode: number): Observable<GeneralResponse> {
        const URL = this.getURL() + "/targets/wakePinned";
        let response$ = this.http.post<GeneralResponse>(URL, { id: id, pinCode: pinCode }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    discoveryStart(network: string): Observable<DiscoveryStartResponse> {
        const URL = this.getURL() + "/discovery/start";
        let response$ = this.http.post<DiscoveryStartResponse>(URL, { network: network }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    discoveryStop(network: string): Observable<DiscoveryStopResponse> {
        const URL = this.getURL() + "/discovery/stop";
        let response$ = this.http.post<DiscoveryStopResponse>(URL, { network: network }, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }

    discoveryGetInterfaces(): Observable<DiscoveryGetInterfacesResponse> {
        const URL = this.getURL() + "/discovery/getInterfaces";
        let response$ = this.http.post<DiscoveryGetInterfacesResponse>(URL, {}, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }
    settingsGet(): Observable<SettingsGetResponse> {
        const URL = this.getURL() + "/settings/get";
        let response$ = this.http.get<SettingsGetResponse>(URL, this.options(this.json()));
        return this.wrapWithIsOKCheck(response$);
    }
    settingsSave(settings: SettingsModel): Observable<SettingsSaveResponse> {
        const URL = this.getURL() + "/settings/save";
        let response$ = this.http.post<SettingsSaveResponse>(URL, { settings: settings }, this.options(this.json()));
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
