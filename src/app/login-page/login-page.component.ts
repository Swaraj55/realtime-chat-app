import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  
  @ViewChild('updateLoginForm') updateLoginForm : NgForm

  constructor(private element: ElementRef,
              private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.element.nativeElement.ownerDocument.body.style.backgroundColor = '#03045e';

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordWithNoSpace, Validators.minLength(8)]],
      room: ['', [Validators.required]]
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
    if(this.loginForm.invalid) {
      return;
    }
  }
}
