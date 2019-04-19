import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { SignupRequest } from '@app/_models';
import { MustMatch, ValidateUsername } from '@app/_helpers';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), ValidateUsername]],
            email: ['', [Validators.required, Validators.maxLength(40), Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).*')]],
            password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        }, {
            validator: MustMatch('password', 'password2')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        let signupRequest: SignupRequest = {
            name: this.registerForm.controls['fullname'].value,
            username: this.registerForm.controls['username'].value,
            email: this.registerForm.controls['email'].value,
            password: this.registerForm.controls['password'].value
        }

        this.userService.register(signupRequest)
            // .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
