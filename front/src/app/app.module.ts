//
// Copyright 2020 Oleg Borodin  <borodin@unix7.org>
//

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { HashLocationStrategy, LocationStrategy } from '@angular/common'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { RoutingModule } from './routing.module'
import { AppComponent } from './app.component'
import { LayoutComponent } from './layout/layout.component'
import { MenuComponent } from './menu/menu.component'

import { SamplesComponent } from './samples/samples.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { UsersComponent } from './users/users.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserUpdateComponent } from './user-update/user-update.component'
import { UserDeleteComponent } from './user-delete/user-delete.component'
import { UserOptionComponent } from './user-option/user-option.component'

import { LoginComponent } from './login/login.component'


import { PagerComponent } from './pager/pager.component'

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        MenuComponent,
        NotFoundComponent,
        SamplesComponent,

        LoginComponent,

        UsersComponent,
        UserCreateComponent,
        UserUpdateComponent,
        UserDeleteComponent,
        UserOptionComponent,

        PagerComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
