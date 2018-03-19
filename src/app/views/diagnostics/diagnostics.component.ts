import { Component, OnInit } from '@angular/core';
import { loadState } from '../../shared/localStorage/localStorage';

@Component({
    selector: 'app-diagnostics',
    templateUrl: './diagnostics.component.html',
    styleUrls: ['./diagnostics.component.scss']
})
export class DiagnosticsComponent implements OnInit {
    logs: any;

    constructor() {
        console.log('constructor herererer');
        this.logs = loadState('redux-logger');
    }

    ngOnInit() {
        console.log('herererer');
    }
}
