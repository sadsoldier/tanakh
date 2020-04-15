import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidationErrors, ValidatorFn } from '@angular/forms'

declare var $: any

import { UserService, UserResponse, User } from '../user.service'

@Component({
  selector: 'user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

    @Input() user: User
    @Output() update: EventEmitter<any> = new EventEmitter()

    form: FormGroup

    alertMessage: string = ""

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService
    ) { }


    onDeleteUser() {
        this.update.emit(null);
    }

    deleteUser(event) {
        var payload: User = {
                id: event.value.id,
        }
        this.userService.deletex(payload).subscribe(
            (response: UserResponse) => {
                if (response.error == false) {
                    this.dismissForm()
                    this.onDeleteUser()
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
        return "user-delete-modal-" + this.user.id
    }

    formId(base: string): string {
        return "user-delete-form-" + base + "-" + this.user.id
    }

    showForm() {
        this.alertMessage = ""
        this.form.reset()
        this.form.patchValue({
            id: this.user.id,
            username: this.user.username,
            confirmation: false
        })
        const id = this.modalId()
        $('#' + id).modal('show')
    }

    dismissForm() {
        const id = this.modalId()
        $('#' + id).modal('hide')
        this.form.reset()
    }

    showAlert(message: string) {
        this.alertMessage = message
    }

    dismissAlert() {
        this.alertMessage = ""
    }

    get formUsername(){
       return this.form.get('username')
    }

    confirmationValidator(): ValidatorFn {
        return (control: FormControl): {[key: string]: any} | null => {
            const value = control.value
            if (value == null) {
                return { invalidConfirmation: "Invalid confirmation" }
            }
            if (value == false) {
                return { invalidConfirmation: "Invalid confirmation" }
            }
            return null
        };
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: null,
            username: [ "", [] ],
            confirmation:  [ false, [ this.confirmationValidator() ] ]
        })
    }
}
