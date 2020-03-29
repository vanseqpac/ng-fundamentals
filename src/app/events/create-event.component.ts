import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { IEvent } from './shared'
import { EventService } from './shared/event.service'

@Component ({
    templateUrl: './create-event.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left: 10px; }
        .error input {background-color: #E3C3C5; }
        .error ::-webkit-input-placeholder {color: #999; }
        .error ::-moz-placeholder {color: #999; }
        .error :-moz-placeholder {color: #999; }
        .error :ms-input-placeholder {color: #999; }
    `]
})

export class CreateEventComponent {
    isDirty: boolean = true
    // newEvent: any

    /*
     * @Inject(TOASTR_TOKEN) => tells angular, for this toastr variable that we are creating, 
     * (that is a private member of this class), you're going to get your value by using the 
     * TOASTR_TOKEN to look up the service in the dependency injection registry.
     * The 'type' information is for the intellisense here in this file.
     */
    constructor(private router: Router, 
                private eventService: EventService) {

    }

    // ngOnInit() {
    //     this.newEvent = {
    //         name: 'Ng Spectacular',
    //         date: '8/8/2028',
    //         time: '10am',
    //         price: 799.99,
    //         location: {
    //             address: '456 Happy St',
    //             city: 'Felicity',
    //             country: 'Angulatarian'
    //         },
    //         onlineUrl: 'http://ngSpectacular.com',
    //         imageUrl: 'http://ngSpectacular.com/logo.png',
    //     }
    // }

    //routing via code
    cancel() {
        this.router.navigate(['/events'])
    }

    saveEvent(formValues) {
        this.eventService.saveEvent(formValues)
        this.isDirty=false
        this.router.navigate(['/events'])
    }
}