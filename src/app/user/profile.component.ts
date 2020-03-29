import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'

@Component({
    templateUrl: './profile.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left: 10px; }
        .error input {background-color: #E3C3C5; }
        .error ::-webkit-input-placeholder {color: #999; }
        .error ::-moz-placeholder {color: #999; }
        .error :-moz-placeholder {color: #999; }
        .error :ms-input-placeholder {color: #999; }
    `]
})

export class ProfileComponent implements OnInit {
    profileForm: FormGroup
    private firstName: FormControl
    private lastName: FormControl

    //when we register a class in app.module, angular creates an instance
    //of that class and gives us that instance to use when we reference it 
    //in a constructor function
    constructor(private auth:AuthService, private router:Router) {
    }

    ngOnInit() {
        this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required,
                                Validators.pattern('[A-Za-z].*')]) 
        this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required)
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    cancel() {
        this.router.navigate(['events'])
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched
    }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)
            this.router.navigate(['events'])
        }
    }

}