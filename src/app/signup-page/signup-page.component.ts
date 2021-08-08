import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { SignupPageService } from '../../app/signup-page/signup-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  programmingLanguage: any[] = [
    'JavaScript', 'Python', 'C++', 'JAVA'
  ]
  
  @ViewChild('updateSignupForm') updateSignupForm : NgForm

  constructor(private element: ElementRef,
              private fb: FormBuilder,
              private signupPage: SignupPageService,
              private _snackBar: MatSnackBar,
              private router: Router
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

  openSnackBar(message: string, action: string, cssClass: string) {
    this._snackBar.open(message, action, {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: cssClass,
        duration: 4000
   });
  } 

  onSubmit() {
    this.isSubmitted = true;

    //stop here if form is invalid
    if(this.signupForm.invalid) {
      return;
    }

    let payload = {
      email: this.signupForm.controls['email'].value,
      name: this.signupForm.controls['name'].value,
      room: this.signupForm.controls['room'].value,
      password: btoa(this.signupForm.controls['password'].value),
    }
    
    this.signupPage.singupUser(payload).subscribe((data: any) => {
      if(data.status === 'success') {
        localStorage.setItem('token', data.token);
        this.openSnackBar('You successfully signup in Discover Chat!', '', 'mat-snack-bar-success');
        this.router.navigate(['/discoverchat'])
        this.updateSignupForm.resetForm({})
      } else {
        this.openSnackBar('You not successfully signup in Discover Chat!', '', 'mat-snack-bar-danger')
      }
    })
  }
}
