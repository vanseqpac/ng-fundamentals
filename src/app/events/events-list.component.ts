import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from './shared/index'

@Component({
    template: `
        <div>
            <h1>Upcoming Angular Events</h1>
            <hr/>
            <div class="row">
                <div *ngFor="let eventObj of events" class="col-md-5">
                    <event-thumbnail [event]="eventObj"></event-thumbnail>
                </div>
            </div>
        </div>
    `
})
export class EventsListComponent implements OnInit{
  events:IEvent[]
  constructor(private eventService: EventService, private route: ActivatedRoute) {
    
  }

  //the resolver gets the events from the eventService. The route takes that and puts it on the route and then we can 
  //access that in our components.
  ngOnInit() {
    //this.eventService.getEvents().subscribe(events => {this.events = events}) //use subscribe() to get data out of observable
    this.events = this.route.snapshot.data['events']
  }

}