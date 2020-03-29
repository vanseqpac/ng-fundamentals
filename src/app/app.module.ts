import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    EventsListResolver,
    EventRouteActivator,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index'

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component'
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { FaInputComponent } from './common/fa-input.component';
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

declare let toastr: Toastr

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    FaInputComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      EventService, 
      EventsListResolver,
      { provide: TOASTR_TOKEN, useValue: toastr}, 
      EventRouteActivator,
      AuthService,
      {
        provide: 'canDeactivateCreateEvent',  //when this is requested
        useValue: checkDirtyState //use this
      }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

//first parameter passed into the canDeactivate function is the component itself
export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you wish to cancel?')
  }
  
  return true;
}
