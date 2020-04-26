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
import { TargetsSaveAction } from 'src/store/target/target.action';

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
        this.selectedInterFace = event.value;
    }

    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router, private generalService: GeneralService, private socketService: SocketService) {
        // this.interfaces$ = this.store.select(state => state.discovery.interfaces)
        this.store.select(state => state.discovery.interfaces).subscribe(networks => {
            this.interfaces = networks.map((network) => { return { value: network, label: network } });
            this.selectedInterFace = this.interfaces.length == 0 ? "Loading..." : this.interfaces[0].value;
        });
        this.store.dispatch(DiscoveryGetInterfacesAction({}));
    }

    discover() {

        this.targets = [];
        this.generalService.discoveryStart(this.selectedInterFace).subscribe();

        this.socketService.subscribeToEvent(new FoundDiscoveryEvent(this.selectedInterFace, null)).subscribe((data) => {
            console.log("found: " + JSON.stringify(data));
            this.targets.push(data);
        });

        this.socketService.subscribeToEvent(new EndDiscoveryEvent(this.selectedInterFace)).subscribe((data) => {
            this.socketService.unsubscribe(new FoundDiscoveryEvent(this.selectedInterFace, null));
            this.socketService.unsubscribe(new EndDiscoveryEvent(this.selectedInterFace));
        });

        this.socketService.subscribeToEvent(new ErrorDiscoveryEvent(this.selectedInterFace, "")).subscribe((data) => {
            this.socketService.unsubscribe(new FoundDiscoveryEvent(this.selectedInterFace, null));
            this.socketService.unsubscribe(new ErrorDiscoveryEvent(this.selectedInterFace, ""));
        });
    }

    ngOnInit() {
        this.store.dispatch(DiscoveryGetInterfacesAction({}));
    }


    save(target: TargetModel) {
        console.log("Save started!");
        this.store.dispatch(TargetsSaveAction({ target: target }));
    }
}