import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from '../shared/index';

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions:ISession[]
    @Input() filterBy:string
    @Input() sortBy:string

    filteredSessions: ISession[] = []

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy)
            this.sortBy === 'name' ? 
                                this.filteredSessions.sort(this.sortByNameAsc) : 
                                this.filteredSessions.sort(this.sortByVotesDesc)
        }
    }

    filterSessions(filter) {
        console.log(filter)
        if (filter === 'all') {
            this.filteredSessions = this.sessions.slice(0)
        } else {
            //pass in a lambda. Take the actual session and 
            this.filteredSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }

    sortByNameAsc(s1: ISession, s2: ISession) {
        return s1.name > s2.name ? 1 : s1.name < s2.name ? -1 : 0
    }

    sortByVotesDesc(s1: ISession, s2: ISession) {
        return s2.voters.length - s1.voters.length
    }
}