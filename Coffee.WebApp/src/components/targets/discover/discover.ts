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
import { DiscoveryGetInterfacesAction } from 'src/store/discovery/discovery.action';
import { SelectItem } from 'primeng/api';

@Component({
    templateUrl: './discover.html',
    selector: 'discover-dialog'
})
export class DiscoverDialog implements OnInit, OnDestroy {
    // targets$: Observable<TargetModel[]>;
    interfaces: SelectItem[];
    selectedInterFace: string;
    targets: TargetModel[];
    ngOnDestroy(): void {
    }
    onChangex(event) {
        console.log("onChange: "  + JSON.stringify(event));
        this.selectedInterFace = event.value;
    }

    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router, private generalService: GeneralService, private socketService: SocketService) {
        // this.interfaces$ = this.store.select(state => state.discovery.interfaces)
        this.store.select(state => state.discovery.interfaces).subscribe(networks => {
            this.interfaces = networks.map((network) => { return { value: network, label: network } });
        });
        this.store.dispatch(DiscoveryGetInterfacesAction({}));
    }

    do() {
        console.log("DO selectedInterface: "+ JSON.stringify(this.selectedInterFace));
        this.targets = [];
        this.generalService.discoveryStart(this.selectedInterFace).subscribe();

        this.socketService.subscribeToEvent(new FoundDiscoveryEvent(this.selectedInterFace, null)).subscribe((data) => {
            console.log("found: " + JSON.stringify(data));
            this.targets.push(data);
        });

        this.socketService.subscribeToEvent(new EndDiscoveryEvent(this.selectedInterFace)).subscribe((data) => {
            let asd = "";
        });

        this.socketService.subscribeToEvent(new ErrorDiscoveryEvent(this.selectedInterFace, "")).subscribe((data) => {
            let asd = "";
        });
    }

    ngOnInit() {
        this.store.dispatch(DiscoveryGetInterfacesAction({}));
    }


    save() { }
}