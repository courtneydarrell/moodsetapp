import { Component, OnInit, NgZone } from '@angular/core';
import { FirebaseService } from '~/app/services/firebase.service';
//import { Log } from '../../models/log.model';
import {Observable} from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
//import * as camera from "nativescript-camera";
import { Subscription } from "rxjs";
import { HttpClient } from '@angular/common/http';
var firebase = require("nativescript-plugin-firebase");

@Component({
  selector: 'calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class CalendarDetailComponent implements OnInit {

   id: string;
    mood: string;
    activity: string;
    other: string;
    date: number;
    imagepath: string;
    UID: string;
    private sub: any;
    public log: Observable<any>;
    public logDetails$: Observable<any>;
    subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private _firebaseService: FirebaseService,
    private http: HttpClient,
  ) { }

  ngOnInit(){

/* this._pageRoute.activatedRoute
        .pipe(switchMap((activatedRoute) => activatedRoute.params))
        .forEach((params) => {
            console.log(params)
            const logId = params.id;

            this._log = this._firebaseService.getLogById(logId);
            console.log('Loaded data:', logId, this._log)
        });
    }
    get log(): Log {
        return this._log;
    } */
 this.sub = this.route.params.subscribe((params: any) => {
    console.log(params);
      this.id = params['id'];

      this._firebaseService.getMyLog(this.id).subscribe((log) => {
        this.ngZone.run(() => {
          for (let prop in log) {
            //props
            if (prop === "id") {
              this.id = log[prop];
            }
            if (prop === "mood") {
              this.mood = log[prop];
            }
            if (prop === "activity") {
              this.activity = log[prop];
            }
            if (prop === "other") {
              this.other = log[prop];
            }
          }
        });
      });
    });
  }

/* onEditButtonTap(): void {
    this._routerExtensions.navigate(["./calendar-detail-edit", this.id],
        {
            relativeTo: this.activatedRoute,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        }); */


    }
