import { Component, OnInit, NgZone } from '@angular/core';
import { FirebaseService } from '~/app/services/firebase.service';
import {Observable} from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
var firebase = require("nativescript-plugin-firebase");
import { Log } from "../moodlogs/models/log.model"

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
  ) { }

  ngOnInit(){
 this.sub = this.route.params.subscribe((params: any) => {
    console.log(params);
      this.id = params['id'];

      this._firebaseService.getMyLog(this.id).subscribe((log) => {
          console.log(log.id)
            this.log = log;
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
