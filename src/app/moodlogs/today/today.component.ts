import { Component, OnInit, OnDestroy } from '@angular/core';
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
  moduleId: module.id,
})
export class TodayComponent {

    constructor(
    ){

    }
    currentDay = new Date()
    private _name: string;
    displayName:string

    ngOnInit() {
        this.currentDay = new Date()
    }

get userName(): string {
    if (this._name) {
        return this._name;
    }
 firebase.getCurrentUser().then(
        user => {
          this._name = user.displayName;

        })

    }
  }
