import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../../theme.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  programmingLanguage: any[] = [
    'JavaScript', 'Python', 'C++', 'JAVA'
  ]
  
  @ViewChild('updateLoginForm') updateLoginForm : NgForm

  constructor(private element: ElementRef,
              private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router
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
    if(this.loginForm.invalid) {
      return;
    }

    let payload = {
      email: this.loginForm.controls['email'].value,
      password: btoa(this.loginForm.controls['password'].value),
      room: this.loginForm.controls['room'].value
    }

    this.authService.loggedIn(payload).pipe(first()).subscribe((data: any) => {
      if(data.status === 'success') {
        console.log(data)
        localStorage.setItem('token', data.token);
        this.openSnackBar('Login successfully', '', 'mat-snack-bar-success');
        this.router.navigate(['/discoverchat'])
      } else {
        this.openSnackBar('Your login attempt was not successful', '', 'mat-snack-bar-danger');
      }
    })
  }
}
