import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleContent()" class="well pointable">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>
            <ng-content *ngIf="visible" select="[well-body]"></ng-content>
        </div>
    `
})

/*
    NOTE: whatever content exists inside of the component gets put in the ng-content tag
    <ng-content *ngIf="visible"></ng-content>
*/
export class CollapsibleWellComponent {

    @Input() title: string;
    visible: boolean = true;

    toggleContent() {
        this.visible = !this.visible;
    }
}