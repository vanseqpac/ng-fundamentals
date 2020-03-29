import { Routes } from '@angular/router'
import {
    EventsListComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    EventDetailsComponent,
    CreateSessionComponent
} from './events/index'

import { Error404Component } from './errors/404.component'

//Routes: Typescript definition for router config that will give extra intellisense and compile time safety
//canActivate: prevent a user from navigating to a page
//canDeactivate: prevent a user from leaving a page 
//resolve route handler; allows you to pre-fetch the necessary data for a component OR to do checks prior loading a component. 
export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },

    //before resolving this route, call the EventsListResolver and when that resolver finishes and 
    //returns some data, add this data to the route as a property named events
    { path: 'events', component: EventsListComponent, resolve: {events: EventsListResolver} },
    { path: 'events/:eventId', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'user', loadChildren:'./user/user.module#UserModule'}
]