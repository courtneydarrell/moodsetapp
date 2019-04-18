import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '~/app/services/firebase.service';
import { Log } from '../models/log.model';
//import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';
//import { finalize } from 'rxjs/operators';
import { ModalDialogParams, ModalDialogService, ModalDialogOptions } from "nativescript-angular";
import { Router, ActivatedRoute } from '@angular/router';
import { ModalViewComponent } from './modal-view/modal-view.component';


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
         private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router

    ) {

    }

    id: string;
    mood: string;
    activity: string;
    other: string;
    date: number;
    imagepath: string;
    UID: string;
   public log: Log;
    public logs$: Observable<any>;

  ngOnInit() {

    this.logs$ = <any>this.firebaseService.getLogList();

  }

/*  add() {
    this.log = new Log(
     this.id,
     this.mood,
     this.activity,
     this.other,
     this.date,
     this.imagepath,
     this.UID)
    let myMood:string = this.log.mood;
   this.firebaseService.add(myMood);
} */

delete(log: Log) {
    this.firebaseService.delete(log)
      .catch(() => {
        alert("An error occurred while deleting an item from your list.");
      });
  }


/*  onItemTap(args: ListViewEventData): void {
    const tappedItem = args.view.bindingContext;
    const options: ModalDialogOptions = {
        viewContainerRef: this.vcRef,
        context: tappedItem.id,
        fullscreen: true,
    };
    console.log(`Tapped on ${tappedItem.id}`);
   this.modal.showModal(ModalViewComponent, options);
   console.log('Data pushed:', tappedItem.id)
} */
  /*  .then((result => {
       console.log('Data pushed:', tappedItem.id)
       console.log(result)  */
   //}));

  /*  onItemTap(args: ListViewEventData): void {
		const tappedItem = args.view.bindingContext;
	    console.log(`Tapped on ${tappedItem.id}`);
		this._routerExtensions.navigate(["./calendar-detail/", tappedItem.id],
			{
				relativeTo: this.route,
				animated: true,
				transition: {
					name: "slide",
					duration: 200,
					curve: "ease"
				}
			});
	} */

viewDetail(id: string){

    this._routerExtensions.navigate(["./calendar-detail", id],
    {
        relativeTo: this.route
    });
  }
}
