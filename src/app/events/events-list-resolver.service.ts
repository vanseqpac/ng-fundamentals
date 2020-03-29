import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { EventService } from './shared/event.service'
import { map } from 'rxjs/operators'

//Wait for data to load before loading the component at all
@Injectable()
export class EventsListResolver implements Resolve<any> {
    constructor(private eventService: EventService) {

    }


    //calling getEvents() which returns our Observable
    //then calling map() on that Observable which gives us access to the events that are passed in on that stream
    //So....we're receiving events into this function and then returning them right back out.
    
    /* Typically when you listen to an Observable, you'd call subscribe, but since this is in a resolver, we need
     * to actually return the Observable to Angular, so Angular can watch the Observable and see when it's finished.
     * If we had used subscribe() here, the value returned would not be an Observable. Subscribe returns a 
     * subscription and not an Observable, so we use map(), which does the same thing as subscribe() and returns the Observable. 
     */
    resolve() { //ajax call
        return this.eventService.getEvents().pipe(map(events => events))
    }
}