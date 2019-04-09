import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { User } from '../moodlogs/models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { alert, prompt } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class AuthComponent implements OnInit {
    user: User;
    isLoggingIn = true;
    isAuthenticating = false;
    processing = false;

    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(private router: RouterExtensions,
    private firebaseService: FirebaseService,) {
        this.user = new User();
        this.user.email = "";
        this.user.password = "";
    }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn:'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {
        updateOn:'blur', validators: [Validators.required, Validators.minLength(6)]})
    });
    this.form.get('email').statusChanges.subscribe(status =>{
      this.emailControlIsValid = status === 'VALID'
    });
    this.form.get('password').statusChanges.subscribe(status =>{
      this.passwordControlIsValid = status === 'VALID'
    });
  }

  submit(){
  /*   this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    if(!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true; */
    if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
    }
    if (this.isLoggingIn){
        this.login();
    } else{
        this.signUp();
    }
  }

  login() {
    this.firebaseService.login(this.user)
     .then(() => {
       this.isAuthenticating = false;
       this.router.navigate(['/logs'], { clearHistory: true } );

     })
     .catch((message:any) => {
       this.isAuthenticating = false;
     });
 }

 signUp() {
    this.firebaseService.register(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this.toggleForm();
      })
      .catch((message:any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }

  focusPassword() {
    this.password.nativeElement.focus();
}
focusConfirmPassword() {
    if (!this.isLoggingIn) {
        this.confirmPassword.nativeElement.focus();
    }
}

  forgotPassword() {

    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for Moodset to reset your password.",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        this.firebaseService.resetPassword(data.text.trim())
          .then((result:any) => {
            if(result){
              alert(result);
            }
         });
      }
    });
 }



/*   onDone(){
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  } */

  toggleForm(){
    this.isLoggingIn = !this.isLoggingIn;
  }

  alert(message: string) {
    return alert({
        title: "Moodset",
        okButtonText: "OK",
        message: message
    });
}
}
