import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '~/app/services/firebase.service';
import { Log } from '../models/log.model';
//import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';
//import { finalize } from 'rxjs/operators';


@Component({
  selector: 'ns-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  moduleId: module.id,
  providers: [FirebaseService]
})
export class CalendarComponent  {

    constructor(
        private _routerExtensions: RouterExtensions,
         private firebaseService: FirebaseService,
    ) { }


   /*  id: string;
    mood: string;
    activity: string;
    other: string;
    date: number;
    imagepath: string;
    UID: string;
   public log: Log; */

    public logs$: Observable<any>;

  ngOnInit() {
    this.logs$ = <any>this.firebaseService.getLogList();
  }

/*   add() {
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
}  */

delete(log: Log) {
    this.firebaseService.delete(log)
      .catch(() => {
        alert("An error occurred while deleting an item from your list.");
      });
  }

  onItemTap(args: ListViewEventData): void {
    const tappedItem = args.view.bindingContext;

    this._routerExtensions.navigate(["/calendar/calendar-detail", tappedItem.id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
}

}
