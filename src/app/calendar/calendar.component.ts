import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '~/app/services/firebase.service';
import { Log } from '../moodlogs/models/log.model';
import { Router, ActivatedRoute } from '@angular/router';
var firebase = require("nativescript-plugin-firebase");
import 'rxjs/add/operator/share';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { isIOS, Color } from 'tns-core-modules/ui/page/page';
import'rxjs/operators'



@Component({
  selector: 'ns-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class CalendarComponent  {
    currentDay= new Date()
    private _isLoading: boolean = false;
    private _logs: ObservableArray<Log> = new ObservableArray<Log>([]);


    constructor(
        private firebaseService: FirebaseService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {

    }

    id: string;
    mood: string;
    activity: string;
    other: string;
    date: Date;
    imagepath: string;
    UID: string;
    updateTs: number;
    public logs$: Observable<any>;



 ngOnInit() {
    this.logs$ = <any>this.firebaseService.getLogList();

    }


viewDetail(id: string){

    this.router.navigate(["../calendar-detail", id],
    {
        relativeTo: this.activatedRoute
    }
    );
}

delete(log: Log) {
    this.firebaseService.delete(log)
      .catch(() => {
        alert("An error occurred while deleting an item from your list.");
      });
  }
onItemLoading(args) {
    if (isIOS) {
        var newcolor = new Color(0, 255, 255, 255);
        args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
}


}

