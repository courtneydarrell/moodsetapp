import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { RouterExtensions } from 'nativescript-angular/router';
var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class ProfileComponent implements OnInit {
  constructor(
  ) {
   }

  ngOnInit() {
  }



}
