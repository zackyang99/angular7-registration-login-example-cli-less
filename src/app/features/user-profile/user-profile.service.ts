import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Place } from '@app/features/model';

@Injectable()
export class UserProfileService {
    constructor(private http: HttpClient) {}

    public getCountyList() {
        return this.http.get<Place[]>(environment.countryListUrl);
    }

    public getStateList(countryId: number) {
        return this.http.get<Place[]>(environment.stateListUrl.replace('%s', countryId.toString()));
    }

    public getCityList(stateId: number) {
        return this.http.get<Place[]>(environment.cityListUrl.replace('%s', stateId.toString()));
    }

    public getCounty2List() {
        return this.http.get<Place[]>(environment.country2ListUrl);
    }

    public getUniversityList(countryId: number) {
        return this.http.get<Place[]>(environment.universityListUrl.replace('%s', countryId.toString()));
    }
}