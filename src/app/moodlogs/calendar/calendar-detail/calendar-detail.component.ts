import { Component, OnInit, NgZone } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { switchMap } from "rxjs/operators";
import { FirebaseService } from '~/app/services/firebase.service';
import { Log } from '../../models/log.model';
import {Observable} from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class CalendarDetailComponent implements OnInit {
    private _log: Log;

    id: string;
    mood: string;
    activity: string;
    other: string;
    date: number;
    imagepath: string;
    UID: string;
    private sub: any;
    public log: Observable<any>;



  constructor(
    private firebaseService: FirebaseService,
    private _pageRoute: PageRoute,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    //private _routerExtensions: RouterExtensions
  ) { }

  ngOnInit(){
       /*  this._pageRoute.activatedRoute
        .pipe(switchMap((activatedRoute) => activatedRoute.params))
        .forEach((params) => {
            const logId = params.id;

            this._log = this._firebaseService.getLogById(logId);
            console.log('Loaded data:', logId)
        }); */
 this.sub = this.route.params.subscribe((params: any) => {
            this.id = params['id'];
            this.firebaseService.getMyLog(this.id).subscribe((log) => {
              console.log('Loaded data:', this.id, this.mood);
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
}

/*  get log(): Log {
    return this._log;
} */

