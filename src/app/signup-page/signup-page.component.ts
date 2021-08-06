import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  
  @ViewChild('updateSignupForm') updateSignupForm : NgForm

  constructor(private element: ElementRef,
              private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#03045e';

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordWithNoSpace, Validators.minLength(8)]],
      room: ['', [Validators.required]],
      name: ['', [Validators.required]]
    })
  }

  private passwordWithNoSpace(control: AbstractControl) {
    if(control.value){
      if((control.value as string).indexOf(' ') >= 0) {
        return {noSpace: true}
      }
      return null;
    } 
  }

  onSubmit() {
    this.isSubmitted = true;

    //stop here if form is invalid
    if(this.signupForm.invalid) {
      return;
    }
  }
}
