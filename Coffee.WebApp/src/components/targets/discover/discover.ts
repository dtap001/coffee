import { Component, OnInit, OnDestroy } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getSelectedTarget, getTargetsState } from 'src/store/target/target.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService, FoundDiscoveryEvent, EndDiscoveryEvent, ErrorDiscoveryEvent } from 'src/app/services/socket.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    templateUrl: './discover.html',
    selector: 'discover-dialog'
})
export class DiscoverDialog implements OnInit, OnDestroy {
    // targets$: Observable<TargetModel[]>;
    targets: TargetModel[];
    ngOnDestroy(): void {
    }


    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router, private generalService: GeneralService, private socketService: SocketService) {
        //  this.targets$ = this.store.select(state => state.targets.discoveredTargets)
        // 192.168.65.129


    }

    do() {
        console.log("DO");
        this.targets = [];
        this.generalService.discoveryStart("192.168.65.0/24").subscribe();

        this.socketService.subscribeToEvent(new FoundDiscoveryEvent("192.168.65.0/24", null)).subscribe((data) => {
            console.log("found: " + JSON.stringify(data));
          this.targets.push(data);
        });

        this.socketService.subscribeToEvent(new EndDiscoveryEvent("192.168.65.0/24")).subscribe((data) => {
            let asd = "";
        });

        this.socketService.subscribeToEvent(new ErrorDiscoveryEvent("192.168.65.0/24", "")).subscribe((data) => {
            let asd = "";
        });
    }

    ngOnInit() {

    }


    save() { }
}