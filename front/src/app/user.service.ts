import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
    id?: number
    username?: string
    password?: string
    isadmin?: boolean
}

export interface UserRequest {
    offset: number
    limit: number
    userPattern: string
}

export interface UserResult {
    total: number
    offset: number
    limit: number
    userPattern: string
    users: User[]
}

export interface UserResponse {
    error: boolean
    message?: string
    result?: UserResult
}

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private httpClient: HttpClient) { }

    list(page: UserRequest) {
        return this.httpClient.post<UserResponse>(`/api/v1/user/list`, {
            "limit": page.limit,
            "offset": page.offset,
            "userPattern": page.userPattern
        })
    }

    check(username: string, password: string) {
        return this.httpClient.post<UserResponse>(`/api/v1/user/login`, {
            "username": username,
            "password": password
        })
    }

    create(user: User) {
        return this.httpClient.post<UserResponse>(`/api/v1/user/create`, {
            "username": user.username,
            "password": user.password,
            "isadmin": user.isadmin
        })
    }

    update(user: User) {
        return this.httpClient.post<UserResponse>(`/api/v1/user/update`, {
            "id": user.id,
            "username": user.username,
            "password": user.password,
            "isadmin": user.isadmin
        })
    }


    deletex(user: User) {
        return this.httpClient.post<UserResponse>(`/api/v1/user/delete`, {
            "id": user.id
        })
    }

}
