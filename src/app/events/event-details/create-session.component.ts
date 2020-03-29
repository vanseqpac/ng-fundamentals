import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms' //angular forms imports for reactive forms
import { ISession, restrictedWords } from '../shared/index'

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left: 10px; }
        .error input, .error select, .error textarea {background-color: #E3C3C5; }
        .error ::-webkit-input-placeholder {color: #999; }
        .error ::-moz-placeholder {color: #999; }
        .error :-moz-placeholder {color: #999; }
        .error :ms-input-placeholder {color: #999; }
    `]
})

export class CreateSessionComponent implements OnInit {
    newSessionForm: FormGroup
    name: FormControl
    presenter: FormControl 
    duration: FormControl
    level: FormControl
    abstract: FormControl

    @Output() newSessionAdded = new EventEmitter();
    @Output() cancelAddSession = new EventEmitter();

    ngOnInit() {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, 
                                            Validators.maxLength(4000), 
                                            restrictedWords(['foo', 'bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    saveSession(formValues) {
        let session: ISession = {
            id: undefined,
            voters: [],
            name: formValues.name,
            presenter: formValues.presenter,
            duration: +formValues.duration, //cast to number. ts isn't complaining because formValues passed in are 
                                            //of type 'any' and 'any' can be applied to any data type.
            level: formValues.level,
            abstract: formValues.abstract
        }

        this.newSessionAdded.emit(session)
    }

    cancel() {
        this.cancelAddSession.emit()
    }

    onNewValue(val) {
        console.log(val);
      }

}