import { Component, OnInit, NgZone } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { switchMap } from "rxjs/operators";
import { FirebaseService } from '~/app/services/firebase.service';
import { Log } from '../../models/log.model';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { ModalDialogParams } from 'nativescript-angular';

@Component({
	moduleId: module.id,
	selector: 'modal-view',
	templateUrl: './modal-view.component.html',
    styleUrls: ['./modal-view.component.css'],
    providers: [FirebaseService]
})

export class ModalViewComponent implements OnInit {
    private _log: Log;

    id: string;
    mood: string;
    activity: string;
    other: string;
    date: number;
    imagepath: string;
    UID: string;
    private sub: any;
    //public log: Observable<any>;

    constructor(
      private _firebaseService: FirebaseService,
      private _pageRoute: PageRoute,
      private ngZone: NgZone,
      private route: ActivatedRoute,
      private modalParams: ModalDialogParams
    ) {

    }

    ngOnInit(): void {
        let logId = "";

        this._pageRoute.activatedRoute
        .pipe(switchMap((activatedRoute) => activatedRoute.params))
        .forEach((params) => {
            logId = params.id;
        });

            this._log = this._firebaseService.getLogById(logId);
              console.log('Loaded log:', logId, this._log)
          }


          get log(): Log {
            return this._log;
        }

         /*  this.sub = this.route.params.subscribe((params: any) => {
            this.id = params['id'];
            this.firebaseService.getMyLog(this.id).subscribe((log) => {
            console.log('Loaded log:', this.id)
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
        } */


}
