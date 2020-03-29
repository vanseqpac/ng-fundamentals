 import { FormControl } from '@angular/forms'   
    
    //Takes in a formControl as parameter
    //returns basic javascript object
    //{'allRestrictedWords': 'foo'} => This is the object returned. key typically maches the validator name
    // private restrictedWords(control: FormControl): {[key: string]: any} {
    //     return control.value.includes('foo') ? {'allRestrictedWords': 'foo'} : null
    // }

    //NOTE: What we provide to our array of validators much just be a function.
    //So if we can make restrictedWords a function that we call, that returns a function
    export function restrictedWords(words) {
        //this is just a fat arrow (lambda) function from ES6
        return (control: FormControl): {[key: string]: any} => {
            if (!words) return null

            //map() is looping over all the keywords and checking the controls value to see if it includes that word
            //then filter out those nulls
            var invalidWords = words
                                .map(w => control.value.includes(w) ? w : null)
                                .filter(w => w != null) 

            return invalidWords && invalidWords.length > 0 
                ? {'allRestrictedWords': invalidWords.join(', ')} 
                : null
        }
    }