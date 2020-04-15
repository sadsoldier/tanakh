
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface SampleRequest {
    region:     string
}

export interface Sample {
    subgroup:   string
    point0:     string
    point1:     string
    point2:     string
    point3:     string
    point4:     string
    point5:     string
}

export interface SampleResult {
    subgroups:  Sample[]
    total:      Sample[]
}

export interface SampleResponse {
    error: boolean
    message?: string
    result?: SampleResult
}

export interface RegionResponse {
    error: boolean
    message?: string
    result?: string[]
}


@Injectable({
    providedIn: 'root'
})

export class SampleService {

    constructor(private httpClient: HttpClient) {}

    getSamples(region: string) : any {
        return this.httpClient.post<SampleResponse>(`/api/v1/sample/list`, {
            "region": region
        })
    }

    getRegions() : any {
        return this.httpClient.get<RegionResponse>(`/api/v1/region/list`)
    }
}
