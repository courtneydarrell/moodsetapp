import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../moodlogs/models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page, View } from 'tns-core-modules/ui/page/page';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures';

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
    processing = false;

    @ViewChild("item") angularItem: ElementRef;
    @ViewChild("btn") btnRef: ElementRef;
    @ViewChild("circle") circleRef: ElementRef;
    @ViewChild("logo") logoRef: ElementRef;
    item: View;
    btnItem: View;
    circleItem: View;
    logoItem: View;
    loginTxt = "L o g i n";
    navigating = false;
    formSubmitted = false;

    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;
    @ViewChild('passwordField') passwordField: ElementRef;

  constructor(private router: RouterExtensions,
    private firebaseService: FirebaseService,
    private _page: Page
   ) {
        this.user = new User();
        this.user.email = "";
        this.user.password = "";
        this.user.confirmPassword = "";
    }

  ngOnInit(): void {
  this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn:'submit', validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {
        updateOn:'submit', validators: [Validators.required, Validators.minLength(6)]}),
    });
   this.form.get('email').statusChanges.subscribe(status =>{
      this.emailControlIsValid = status === 'VALID'
    });
    this.form.get('password').statusChanges.subscribe(status =>{
      this.passwordControlIsValid = status === 'VALID'
    });
    this._page.on('navigatingTo', (data) => {
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        this.navigating = false;
        this.logoItem.translateY = 0;
    })
    this._page.actionBarHidden = true;
    this.btnItem = this.btnRef.nativeElement;
    this.item = this.angularItem.nativeElement;
    this.circleItem = this.circleRef.nativeElement;
    this.logoItem = this.logoRef.nativeElement;

    this.item.scaleX = 0;
    this.item.scaleY = 0;
    this.circleItem.scaleX = 0;
    this.circleItem.scaleY = 0;
    this.btnItem.translateY = -50;
  }

/*   toggleShow() {
    console.log(this.passwordField.nativeElement.secure);
    this.passwordField.nativeElement.secure = !this.passwordField.nativeElement.secure;
} */

  submit(){

    if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
    }
    this.processing = true;
    if (this.isLoggingIn){
        this.login();
    } else{
        this.signUp();
    }
  }
facebookLogin(){
    this.firebaseService.facebookLogin(this.user)
    .then(() => {
      this.formSubmitted = true;
      this.navigating = true;
      this.router.navigate(['/logs'], { clearHistory: true } );
    })
    .catch((message:any) => {
        this.formSubmitted = false;
    });
}

/*
  login() {
    this.firebaseService.login(this.user)
     .then(() => {
       this.isAuthenticating = false;
       this.router.navigate(['/logs'], { clearHistory: true } );

     })
     .catch((message:any) => {
        alert(message);
       this.isAuthenticating = false;
     });
 } */

 signUp() {
    if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
      }
    this.firebaseService.register(this.user)
      .then(() => {
          this.alert("Account created!")
        this.processing = false;
        this.setToLogin();
      })
      .catch((message:any) => {
        this.processing = false;
        alert(message);
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

setToLogin() {
    this.item.animate({
        scale: { x: 0, y: 0 },
        duration: 300
    }).then(() => {
        this.isLoggingIn = true;
        this.loginTxt = "L o g i n";
         this.btnItem.animate({
            translate: { x: 0, y: -50 },
            duration: 200
        })
    });
}

setToRegister() {

    this.isLoggingIn = false;
    this.loginTxt = "R e g i s t e r";

    this.btnItem.animate({
        translate: { x: 0, y: 0 },
        duration: 200
    })
     .then(() => {
        this.item.animate({
            scale: { x: 1.6, y: 1.6 },
            duration: 300
        }).then(() => {
            this.item.animate({ scale: { x: 1, y: 1 }, duration: 200 })
        });
});
}

login(): void {
    this.formSubmitted = true;
    this.firebaseService.login(this.user);
    setTimeout(() => {

        this.navigating = true;

        this.logoItem.animate({
            translate: { x: 0, y: 200 },
            duration: 400
        }).then(() => {
            this.circleItem.translateY = 200;
            this.circleItem.animate({
                scale: { x: 15, y: 15 },
                duration: 400,
            }).then(() => {
                this.processing = false;
                this.router.navigate(['/logs'], { clearHistory: true } );
            }).catch((message:any) => {
                this.formSubmitted = false;
                alert(message);
             });
        });

    }, 2500);
}

onFocus(args: TouchGestureEventData) {
    if (args.action == "down") {
        this.btnItem.scaleX = 0.9;
        this.btnItem.scaleY = 0.9;
    } else if (args.action == "up") {
        this.btnItem.scaleX = 1;
        this.btnItem.scaleY = 1;
    }

}
}
