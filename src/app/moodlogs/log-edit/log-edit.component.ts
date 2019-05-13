import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Log } from '../models/log.model';
import { FirebaseService } from '~/app/services/firebase.service';
import { Observable } from 'rxjs';
var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: 'ns-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})

export class LogEditComponent implements OnInit {

    id: string;
    mood: string;
    activity: string;
    other: string;
    date: number;
    updateTs: number;
    imagepath: string;
    UID: string;
   public log: Log;



    constructor (private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private router: Router)
      {}

    ngOnInit() {
        this.logs$ = <any>this.firebaseService.getLogList();
  }


    public logs$: Observable<any>;

  add() {

    this.log = new Log(
     this.id,
     this.mood,
     this.activity,
     this.other,
     this.date,
     this.updateTs,
     this.imagepath,
     this.UID)
    //let myMood:string = this.log.mood;
   this.firebaseService.add(this.mood, this.activity, this.other
       );
   this.routerExtensions.backToPreviousPage();
}

}
