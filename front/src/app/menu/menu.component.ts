import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { LoginService } from '../login.service'


@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    logout() {
        this.loginService.logout()
        this.router.navigate(['/login'])
    }

    ngOnInit() {
    }

}
