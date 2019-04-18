import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";

import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent } from "./calendar.component";
import { CalendarDetailComponent } from "./calendar-detail/calendar-detail.component"
import { ModalViewComponent } from "./modal-view/modal-view.component";



@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        CalendarRoutingModule,
    ],

    declarations: [
         CalendarComponent,
        CalendarDetailComponent,
        //ModalViewComponent
        //MyListSelectorComponent,
       // MyListSelectorModalViewComponent,
    ],
    entryComponents: [
        //ModalViewComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CalendarModule { }
