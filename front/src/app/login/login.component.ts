import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from "@angular/router"

import { UserService, UserResponse, User } from '../user.service'
import { LoginService } from '../login.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup

    user: User
    error: boolean
    message: string

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private loginService: LoginService,
        private router: Router
    ) {}

    login(event) {
        let username = event.value.username
        let password = event.value.password

        this.userService.check(username, password).subscribe(
            (response: UserResponse) => {
                if (response.error == false) {
                    this.error = response.error
                    this.message = null
                    this.user = response.result[0]
                    this.loginService.login()
                    this.loginForm.reset()
                    this.router.navigate([ "/" ])
                }
            },
            (error) => {
                console.log(error)
                this.error = true
                this.message = error.message
                this.user = null
                this.loginService.logout()
            }
        )
        this.loginForm.reset()
    }

    get loginFormUsername(){
       return this.loginForm.get('username')
    }
    get loginFormPassword(){
       return this.loginForm.get('password')
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [ "user1", [ Validators.required ] ],
            password: [ "12345", [ Validators.required ] ]
        })

        if (this.loginService.isLogin()) {
            this.router.navigate([ "/" ])
            return
        }
    }
}
