import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
@Component({    
    templateUrl: './page.not.found.html',
})
export class PageNotFoundComponent implements OnInit {

    title = 'Coffee';
    ngOnInit() {
    }
}
