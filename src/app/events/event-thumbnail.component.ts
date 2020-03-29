import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IEvent } from './shared/index'

@Component({
    selector: 'event-thumbnail',
    template: `
        <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
            <h2>{{event?.name | uppercase}}</h2>
            <div>Date: {{event?.date | date:'shortDate'}}</div>
            <div [ngStyle]="getStartTimeStyle()" 
                [ngSwitch]="event?.time">
                Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'"><i>(Early Start)</i></span>
                <span *ngSwitchCase="'10:00 am'"><i>(Late Start)</i></span>
                <span *ngSwitchDefault><i> (Normal Start)</i></span>
            </div>
            <div>Price: {{event?.price | currency:'USD'}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}}</span>
                <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                Online URL: {{event.onlineUrl}}
            </div>
        </div>
    `,
    styles: [`
        .green { color: #003300 !important; }
        .blue { color: blue !important; }
        .red { color: red !important; }
        .bold { font-weight: bold; }
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well div {color: #bbb; }
    `]
})
export class EventThumbnailComponent {
    @Input() event: IEvent

    getStartTimeClass() {
        if (this.event && this.event.time === '8:00 am')
            return 'green bold'
        else if (this.event && this.event.time === '9:00 am')
            return 'blue bold'
        else
            return 'red bold'
    }

    getStartTimeStyle():any {
        if (this.event && this.event.time === '8:00 am')
            return {color: '#003300', 'font-weight': 'bold'}
        // else if (this.event && this.event.time === '9:00 am')
        //     return {color: 'blue', 'font-weight': 'normal'}
        // else
        //     return {color: 'red', 'font-weight': 'normal'}
        else
            return {}
            
    }
}