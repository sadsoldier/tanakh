//
// Copyright 2020 Oleg Borodin  <borodin@unix7.org>
//

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PageGuard } from './page.guard'
import { LoginComponent } from './login/login.component'

import { SamplesComponent } from './samples/samples.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { UsersComponent } from './users/users.component'


export const routes: Routes = [
    { path: "login", component: LoginComponent, data: { name: "Login" } },
    { path: "", component: SamplesComponent, canActivate: [PageGuard],  data: { name: "Sample" } },
    { path: "users", component: UsersComponent, canActivate: [PageGuard], data: { name: "Users" } },
    { path: "notfound", component: NotFoundComponent, canActivate: [PageGuard] },
    { path: "**", component: NotFoundComponent, canActivate: [PageGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
