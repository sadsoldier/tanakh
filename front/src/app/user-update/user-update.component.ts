import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidationErrors, ValidatorFn } from '@angular/forms'

declare var $: any

import { UserService, User, UserResponse } from '../user.service'

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

    @Input() user: User
    @Output() update : EventEmitter<any> = new EventEmitter()

    form: FormGroup

    alertMessage: string = ""

    minUsernameLength: number = 5
    minPasswordLength: number = 5

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService
    ) { }


    onUpdateUser() {
        this.update.emit(null);
    }

    updateUser(event) {
        var payload: User = {
                id: event.value.id,
                username: event.value.username,
                password: event.value.password,
                isadmin: event.value.isadmin
        }
        this.userService.update(payload).subscribe(
            (response: UserResponse) => {
                if (response.error == false) {
                    this.dismissForm()
                    this.onUpdateUser()
                    return
                }
                if (response.message != null) {
                    this.showAlert("Backend error: " + response.message)
                } else {
                    this.showAlert("Backend error.")
                }
            },
            (error) => {
                this.showAlert("Connection error: " + error.message)
            }
        )
    }

    modalId(): string {
        return "user-update-modal-" + this.user.id
    }

    formId(base: string): string {
        return "user-update-form-" + base + "-" + this.user.id
    }

    showForm() {
        this.alertMessage = ""
        this.form.reset()
        this.form.patchValue({
            id: this.user.id,
            username: this.user.username,
            password: "",
            isadmin: this.user.isadmin
        })
        const id = this.modalId()
        $('#' + id).modal('show')
    }

    dismissForm() {
        const id = this.modalId()
        $('#' + id).modal('hide')
        this.form.reset()
    }

    get formUsername(){
       return this.form.get('username')
    }
    get formPassword(){
       return this.form.get('password')
    }

    showAlert(message: string) {
        this.alertMessage = message
    }

    dismissAlert() {
        this.alertMessage = ""
    }

    passwordValidator(): ValidatorFn {
        return (control: FormControl): {[key: string]: any} | null => {
            const value = control.value
            if (value == null) {
                return null
            }
            if (value.length > 0 && value.length < this.minPasswordLength) {
                return { invalidPassword: "Password too short" }
            }
            return null
        };
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: null,
            username: [ "", [ Validators.required, Validators.minLength(this.minUsernameLength)] ],
            password: [ "", [ this.passwordValidator() ] ],
            isadmin:  [ false, [] ]
        })
    }
}
