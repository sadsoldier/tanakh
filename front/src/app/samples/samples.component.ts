//
// Copyright 2020 Oleg Borodin  <borodin@unix7.org>
//

import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

import { SampleService, Sample, SampleRequest, SampleResponse, SampleResult } from '../sample.service'
import { RegionResponse } from '../sample.service'

@Component({
    selector: 'samples',
    templateUrl: './samples.component.html',
    styleUrls: ['./samples.component.scss']
})

export class SamplesComponent implements OnInit {

    selectForm: FormGroup

    noticeMessage: string = ""
    alertMessage: string = ""

    regions: string[] = []

    samples: SampleResult = {
        subgroups:   [],
        total:       []
    }

    region: string = ""

    constructor(
        private formBuilder: FormBuilder,
        private sampleService: SampleService
    ) {}

    getSamples(region: string) {
        this.sampleService.getSamples(region).subscribe(
            (response: SampleResponse) => {
                console.log(response)
                if (response.error == false) {
                    this.samples = response.result
                } else {
                    if (response.message != null) {
                        this.alertMessage = "Backend error: " + response.message
                    } else {
                        this.alertMessage = "Backend error."
                    }
                }
            },
            (error) => {
                if (error.message != null) {
                    this.alertMessage = "Communication error: " + error.message
                } else {
                    this.alertMessage = "Communication error."
                }
            }
        )
    }

    getRegions() {
        this.sampleService.getRegions().subscribe(
            (response: RegionResponse) => {
                console.log(response)
                if (response.error == false) {
                    this.regions = response.result
                } else {
                    if (response.message != null) {
                        this.alertMessage = "Backend error: " + response.message
                    } else {
                        this.alertMessage = "Backend error."
                    }
                }
            },
            (error) => {
                if (error.message != null) {
                    this.alertMessage = "Communication error: " + error.message
                } else {
                    this.alertMessage = "Communication error."
                }
            }
        )
    }

    /* Alerts */
    showAlert(message: string) {
        this.alertMessage = message
    }
    dismissAlert() {
        this.alertMessage = null
    }

    /* Notices */
    showNotice(message: string) {
        this.noticeMessage = message
    }
    dismissNotice() {
        this.noticeMessage = null
    }


    ngOnInit() {
        this.selectForm = this.formBuilder.group({
            region: [ "" ],
        })

        this.getRegions()
        //this.getSamples()

        this.selectForm.get('region').valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(value => {
                this.getSamples(value)
            })
    }

}
