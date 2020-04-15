import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { LoginService } from '../login.service'

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

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
