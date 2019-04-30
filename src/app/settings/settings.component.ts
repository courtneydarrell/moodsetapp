import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Router } from '@angular/router';
import { User } from '~/app/moodlogs/models/user.model';
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: [
   './settings.component.css',
],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class SettingsComponent implements OnInit {
    user: User;
    private _email: string;

  constructor(
    private firebaseService: FirebaseService,
    private routerExtensions: RouterExtensions,
    private router: Router
  ) { }

  ngOnInit() {
  }

  get email(): string {
    if (this._email) {
        return this._email;
    }
 firebase.getCurrentUser().then(
        user => {
          this._email = user.email;

        })
    }
  logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/"], { clearHistory: true } );
  }
}
