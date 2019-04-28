import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CalendarComponent } from "./calendar.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { CalendarDetailComponent } from "./calendar-detail.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptUIListViewModule,
        SharedModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "calendar"},
            { path: "calendar", component: CalendarComponent},
            { path: "calendar-detail/:id", component: CalendarDetailComponent },
        ])
    ],
    declarations: [
        CalendarComponent,
        CalendarDetailComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CalendarModule { }

