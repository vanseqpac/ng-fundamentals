import { Component, Inject } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IEvent, ISession } from '../shared/index';
import { TOASTR_TOKEN, Toastr } from '../../common/toastr.service'

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a {cursor: pointer}
    `]
})

export class EventDetailsComponent {
    event:IEvent
    addMode:boolean
    filterBy: string = 'all';
    sortBy: string = 'votes';

    constructor(private eventService:EventService, 
                private route: ActivatedRoute, 
                private router: Router,
                @Inject(TOASTR_TOKEN) private toastr: Toastr) {

    }

    ngOnInit() {
        this.event = this.eventService.getEvent( +this.route.snapshot.params['eventId']);
    }

    addSession() {
        // this.router.navigate(['events/session/new'])
        this.addMode = true
    }

    saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id))
        session.id = nextId
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }

    cancelAddNewSession() {
        this.addMode = false
    }

}