import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LogTabsComponent } from "./log-tabs/log-tabs.component";
import { TodayComponent } from "./today/today.component";
import { SettingsComponent } from "../settings/settings.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ArticlesComponent } from "../articles/articles.component";



const routes: Routes= [
    {
        path: 'tabs' ,
        component: LogTabsComponent,
        children: [
        { path: 'today', component: TodayComponent, outlet: 'today' },
        { path: 'calendar', component: CalendarComponent, outlet: 'calendar'},
        { path: 'articles', component: ArticlesComponent, outlet: 'articles'},
        { path: 'settings', component: SettingsComponent, outlet: 'settings'},
    ]},
    { path: ':mode', loadChildren: '~/app/moodlogs/log-edit/log-edit.module#LogEditModule'},
    { path: '', redirectTo: '/logs/tabs' , pathMatch: 'full'}
];

@NgModule ({
    imports: [
        NativeScriptRouterModule.forChild(routes),
    ],
    exports: [NativeScriptRouterModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})

export class MoodlogsRoutingModule {

}
