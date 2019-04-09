import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
//import { take } from 'rxjs/operators';
import { Log } from '../models/log.model';
import { FirebaseService } from '~/app/services/firebase.service';
import { Observable } from 'rxjs';


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
    imagepath: string;
    UID: string;
   public log: Log;


    constructor (private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private router: Router)
      {}

    ngOnInit() {
        this.logs$ = <any>this.firebaseService.getLogList();
    //this.message$ = <any>this.firebaseService.getMyMessage();
  }
   /*    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
          activatedRoute.paramMap.subscribe(paramMap => {
            if (!paramMap.has('mode')) {
              this.isCreating = true;
            } else {
              this.isCreating = paramMap.get('mode') !== 'editCurrent'
            } */
/*
            if (!this.isCreating){
              this.logService.currentLog.pipe(take(1)).subscribe(log =>{
                this.mood = log.mood;
                this.activity = log.activity;
                this.other = log.other;
              });
            }
      });
    });*/

    public logs$: Observable<any>;

  add() {
    this.log = new Log(
     this.id,
     this.mood,
     this.activity,
     this.other,
     this.date,
     this.imagepath,
     this.UID)
//let myMood:string = this.log.mood;
   this.firebaseService.add(this.mood, this.activity, this.other);
   this.routerExtensions.backToPreviousPage();
}

}
