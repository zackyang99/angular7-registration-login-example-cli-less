import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, LoginRequest, JwtAuthenticationResponse } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(loginRequest: LoginRequest) {
        return this.http.post<any>(environment.signinUrl, loginRequest)
            .pipe(map((jwtAuthResponse: JwtAuthenticationResponse) => {
                // login successful if there's a jwt token in the response
                if (jwtAuthResponse && jwtAuthResponse.accessToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    sessionStorage.setItem('accessToken', jwtAuthResponse.accessToken);
                    this.currentUserSubject.next(null);
                }

                return jwtAuthResponse;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        sessionStorage.removeItem('accessToken');
        this.currentUserSubject.next(null);
    }

    private setAccessToken(accessToken: string): void {
        sessionStorage.setItem('accessToken', accessToken);
    }

    public getAccessToken(): string {
        return sessionStorage.getItem('accessToken');
    }
}