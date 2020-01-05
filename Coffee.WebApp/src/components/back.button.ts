import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'back-button',
    //template: `<button mat-button (click)="goBack()"  >Back</button>`,
    template: ` <p-button fxLayout="column" fxLayoutAlign="center stretch" (click)="goBack()">
    <div fxLayout="row" fxFlexFill fxLayoutAlign="center center">
        <i style="color:white" class="pi pi-directions-alt"></i>
        <label>Back</label>
    </div>
</p-button>`
})
export class BackButtonComponent {
    @Input() color: string;

    constructor(private location: Location) { }

    goBack() {
        this.location.back();
    }
}