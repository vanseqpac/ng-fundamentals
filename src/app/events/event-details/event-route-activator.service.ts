import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'
import { EventService } from '../shared/event.service'

@Injectable()
export class EventRouteActivator implements CanActivate {
    constructor(private eventService: EventService, private router: Router) {

    }

    //current route is passed into canActivate method as the 1st parameter
    canActivate(route: ActivatedRouteSnapshot) {
        const eventExists = !!this.eventService.getEvent(+route.params['eventId'])    //cast result of call to boolean

        if (!eventExists) {
            this.router.navigate(['/404'])
        }

        return eventExists
    }
}