import { InjectionToken } from '@angular/core';

/*
 InjectionToken simply creates a token used by dependency injection 
 registry to find the instance of the service we want

 InjectionToken constructor takes in a type parameter, and that's the type of the object that is 
 given back for the service requested

 The string passed in to the constructor is creating a token that I can then use to look up 
 the toastr object inside of the dependency injection registry.
*/

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr')

export interface Toastr {
    success (msg: string, title?: string): void;
    info (msg: string, title?: string): void;
    warning (msg: string, title?: string): void;
    error (msg: string, title?: string): void;
}