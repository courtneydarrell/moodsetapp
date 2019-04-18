import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CalendarComponent } from "./calendar.component";
import { CalendarDetailComponent } from "./calendar-detail/calendar-detail.component";
//import { ModalViewComponent } from "./modal-view/modal-view.component";


const calendarRoutes: Routes = [
    //{ path: "", redirectTo: "calendar" },
    { path: "", component: CalendarComponent },
    { path: "calendar-detail/:id", component: CalendarDetailComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(calendarRoutes)],
    exports: [NativeScriptRouterModule]
})

export class CalendarRoutingModule { }
