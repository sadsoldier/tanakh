import { Injectable } from '@angular/core';

import * as Cookies from 'js-cookie'

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    loginStatus: boolean = false
    cookieName: string = 'session'

    constructor() { }

    isLogin(): boolean {
        let cookie = Cookies.get(this.cookieName)
        if (cookie == null) {
            this.loginStatus = false
        }
        return this.loginStatus
    }

    login() {
        this.loginStatus = true
    }

    logout() {
        this.loginStatus = false
        Cookies.remove(this.cookieName)
    }

}
