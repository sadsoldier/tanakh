import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidationErrors, ValidatorFn } from '@angular/forms'

declare var $: any

import { UserService, User, UserResponse } from '../user.service'

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

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


    onCreateUser() {
        this.update.emit(null);
    }

    createUser(event) {
        var payload: User = {
                username: event.value.username,
                password: event.value.password,
                isadmin: event.value.isadmin
        }
        this.userService.create(payload).subscribe(
            (response: UserResponse) => {
                if (response.error == false) {
                    this.dismissForm()
                    this.onCreateUser()
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
        return "user-create-modal"
    }

    formId(base: string): string {
        return "user-create-form-" + base
    }

    showForm() {
        this.alertMessage = ""
        this.form.reset()
        //this.form.patchValue({
        //    username: "",
        //    password: "",
        //    isadmin: false
        //})
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

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: [ "", [ Validators.required, Validators.minLength(this.minUsernameLength) ] ],
            password: [ "", [ Validators.required, Validators.minLength(this.minUsernameLength) ] ],
            isadmin:  [ false, [] ]
        })
    }
}
