import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(request).pipe(catchError(err => {
        //     if (err.status === 401) {
        //         // auto logout if 401 response returned from api
        //         this.authenticationService.logout();
        //         location.reload(true);
        //     }
            
        //     const error = err.error.message || err.statusText;
        //     return throwError(error);
        // }))
        
        return next.handle(request).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        let self = this;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);

            if (error.status === 401) {
                // auto logout if 401 response returned from api
                self.authenticationService.logout();
                location.reload(true);
            }
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
    };
}