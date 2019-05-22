import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserProfileService } from './user-profile.service';
import { Place } from '@app/features/model';

export interface Animal {
    name: string;
    sound: string;
}

export interface Device {
    name: string;
    price: number;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
         return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'user-profile',
    styleUrls: ['./user-profile.component.less'],
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit{
    profileForm: FormGroup;
    loading = false;
    submitted = false;

    countries = [];
    states= [];

    constructor(private formBuilder: FormBuilder, private upService: UserProfileService) { }

    public ngOnInit(): void {
        // this.profileForm = this.formBuilder.group({
        //     country: ['', Validators.required],
        //     city: ['', Validators.required],
        //     expertises: this.formBuilder.array([this.createExpertise()])
        // })
        this.profileForm = this.formBuilder.group({
            animalControl: ['', Validators.required],
            deviceControl: ['', Validators.required],
            emailControl: ['', [Validators.email, Validators.required]],
            education: this.formBuilder.array([this.createEducation()])
        })

        this.upService.getCountyList().subscribe((data: Place[]) => {
            this.countries = data;
        }, error => {
            console.log(error);
        })

        this.upService.getCounty2List().subscribe((data: Place[]) => {
            console.log(data);
        })

        this.upService.getUniversityList(4).subscribe((data: Place[]) => {
            console.log(data);
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

    createEducation(): FormGroup {
        return this.formBuilder.group({
            country: '',
            institute: '',
            major: '',
            from: '',
            to: ''
        })
    }

    addEducation(): void {
        let education = this.profileForm.get('education') as FormArray;
        education.push(this.createEducation());
    }

    removeEducation(i: number) {
        let education = this.profileForm.get('education') as FormArray;
        education.removeAt(i);
    }

    countryChanged(event) {
        // let countryId = event.value.id;
        let countryId = event.value;
        this.upService.getStateList(countryId).subscribe((data: Place[]) => {
            this.states = data;
        })
    }

    stateChanged(event) {
        let stateId = event.value.id;
        this.upService.getCityList(stateId).subscribe((data: Place[]) => {
            console.log(data);
        })
    }

    // animalControl = new FormControl('', [Validators.required]);
    // selectFormControl = new FormControl('', Validators.required);
    animals: Animal[] = [
        {name: 'Dog', sound: 'Woof!'},
        {name: 'Cat', sound: 'Meow!'},
        {name: 'Cow', sound: 'Moo!'},
        {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
    ];

    devices: Device[] = [
        {name: 'MacBook', price: 3000},
        {name: 'iPad', price: 1000},
        {name: 'iPhone', price: 500},
        {name: 'iPod', price: 250}
    ]

    matcher = new MyErrorStateMatcher();




    public imagePath;
    url: string | ArrayBuffer;
    pdfdata: string | ArrayBuffer;
    onSelectFile(event) { // called each time file input changes
        console.log(event);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            this.imagePath = event.target.files;
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
                this.url = reader.result; //add source to image
                this.pdfdata = reader.result;
                
            }
        }
    }
}