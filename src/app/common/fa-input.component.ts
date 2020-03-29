import { Component, Input, Output, HostBinding, EventEmitter } from "@angular/core";

@Component({
    selector: 'fa-input',
    template: `
        <i _ngcontent-c0="" class="fa" [ngClass]="classes"></i>
        <ng-content></ng-content>
    `,
    styles: [`
    :host {
        border: 1px solid red;
      }
      
      input[_ngcontent-c0] {
        border: none;
        outline: none;
      }
      
      :host(.focus) {
        border: 1px solid blue;`]
})

export class FaInputComponent {
    @Input() icon: string;
    @Output() value = new EventEmitter();
    
    inputFocus = false;

    get classes() {
        const cssClasses = {
          fa: true
        };
        cssClasses['fa-' + this.icon] = true;
        // console.log(cssClasses)
        return cssClasses;
    }
    
    @HostBinding('class.focus')
    get focus() {
        console.log(this.inputFocus);
        return this.inputFocus;
    }
}