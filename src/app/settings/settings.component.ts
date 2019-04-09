import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { RouterExtensions } from 'nativescript-angular/router';


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

  logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/"], { clearHistory: true } );
  }
}
