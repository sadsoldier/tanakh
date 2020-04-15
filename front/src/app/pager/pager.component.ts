//
// Copyright 2020 Oleg Borodin  <borodin@unix7.org>
//

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

    @Input() total: number
    @Input() limit: number
    @Input() offset: number

    @Output() newOffset: EventEmitter<number> = new EventEmitter()

    constructor() { }

    onCellClick(pageNumber: number) {
        let offset = this.limit * pageNumber
        this.newOffset.emit(offset)
    }

    cellBottom(pageNumber: number) : number {
        return (this.limit * pageNumber) + 1
    }

    cellTop(pageNumber: number) : number {
        let top = (this.limit * pageNumber) + this.limit
        if (top > this.total) {
            top = this.total
        }
        return top
    }

    showRange(i: number) : string {
        return String(i + 1)
        //var bottom = this.cellBottom(i)
        //var top = this.cellTop(i)
        //if (bottom == top) {
        //    return String(bottom)
        //}
        //return bottom + "-" + top
    }

    pageArray() {
        return new Array(this.countPages())
    }

    countPages() : number {
        return Math.floor((this.total / this.limit) - 0.000001) + 1
    }

    currentPage() : number {
        return Math.floor(this.offset / this.limit - 0.000001) + 1
    }

    ngOnInit() {
    }

}
