//
// Copyright 2020 Oleg Borodin  <borodin@unix7.org>
//

import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'

import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true
    }

}
