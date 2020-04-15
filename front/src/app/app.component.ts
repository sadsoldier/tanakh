//
// Copyright 2020 Oleg Borodin  <borodin@unix7.org>
//

import { Component, OnInit } from '@angular/core'

import { Routes } from '@angular/router'
import { routes } from './routing.module'

@Component({
    selector: 'application',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    routes: Routes

    ngOnInit() {
        this.routes = routes
    }

}
