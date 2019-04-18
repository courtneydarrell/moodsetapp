import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { User } from '../moodlogs/models/user.model';
var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class SettingsComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private routerExtensions: RouterExtensions,
  ) { }

  ngOnInit() {
  }

  getCurrentUser() {
    const user = firebase.getCurrentUser();
    let name, email, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
      }
      console.log('User:', user.email)
  }

  logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/"], { clearHistory: true } );
  }
}
