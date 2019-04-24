import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfile implements OnInit{
    profileForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder,) { }

    public ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            country: ['', Validators.required],
            city: ['', Validators.required],
            expertises: this.formBuilder.array([this.createExpertise()])
        })
    }
    

    createExpertise(): FormGroup {
        return this.formBuilder.group({
            expertise: '',
            years: ''
        })
    }

    addExpertise(): void {
        let expertises = this.profileForm.get('expertises') as FormArray;
        expertises.push(this.createExpertise());
    }

    removeExpertise(i : number) {
        let expertises = this.profileForm.get('expertises') as FormArray;
        expertises.removeAt(i);
    }
}