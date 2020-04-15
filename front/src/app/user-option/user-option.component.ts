import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

declare var $: any

import { User } from '../user.service'

@Component({
  selector: 'user-option',
  templateUrl: './user-option.component.html',
  styleUrls: ['./user-option.component.scss']
})
export class UserOptionComponent implements OnInit {

    @Input() user: User
    @Output() update: EventEmitter<any> = new EventEmitter()

    constructor(
    ) { }

    onUpdate() {
        console.log("event")
        this.update.emit(null)
        this.dismissForm()
    }


    modalId(): string {
        return "user-option-modal-" + this.user.id
    }

    showForm() {
        const id = this.modalId()
        $('#' + id).modal('show')
    }

    dismissForm() {
        const id = this.modalId()
        $('#' + id).modal('hide')
    }

    ngOnInit() {
    }
}
