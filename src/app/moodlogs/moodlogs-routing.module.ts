import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LogTabsComponent } from "./log-tabs/log-tabs.component";
import { TodayComponent } from "./today/today.component";
import { SettingsComponent } from "../settings/settings.component";
import { ArticlesComponent } from "../articles/articles.component";
//import { CalendarComponent } from "./calendar/calendar.component";
//import { CalendarDetailComponent } from "./calendar/calendar-detail.component"

const moodlogRoutes: Routes= [
    {
        path: 'tabs',
        component: LogTabsComponent,
        children: [

        { path: 'today',
        component: TodayComponent,
        outlet: 'today' },

        { path: 'calendar',
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/calendar/calendar.module#CalendarModule",
        outlet: 'calendar'},

        { path: 'articles',
        component: NSEmptyOutletComponent,
        loadChildren:"~/app/articles/articles.module#ArticlesModule",
        outlet: 'articles'},

        { path: 'settings',
        component: NSEmptyOutletComponent,
        loadChildren:"~/app/settings/settings.module#SettingsModule",
        outlet: 'settings'},
    ]},

    { path: ':mode', loadChildren: '~/app/moodlogs/log-edit/log-edit.module#LogEditModule'},
    { path: '', redirectTo: '/logs/tabs' , pathMatch: 'full'}
];

@NgModule ({
    imports: [
        NativeScriptRouterModule.forChild(moodlogRoutes),
    ],
    exports: [NativeScriptRouterModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})

export class MoodlogsRoutingModule {

}
