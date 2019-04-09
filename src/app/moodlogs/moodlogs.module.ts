import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
//import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular'


import { MoodlogsRoutingModule } from "./moodlogs-routing.module";
import { LogTabsComponent } from "./log-tabs/log-tabs.component";
import { TodayComponent } from "./today/today.component";
import { SettingsComponent } from "../settings/settings.component";
import { SharedModule } from "../shared/shared.module";
//import { DayActionsModule } from "./day-action/day-actions.module";
import { ArticlesComponent } from '../articles/articles.component';
//import { LogEditComponent } from './log-edit/log-edit.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";



@NgModule ({
    declarations: [
            LogTabsComponent,
            TodayComponent,
            SettingsComponent,
            ArticlesComponent,
        ],

    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        MoodlogsRoutingModule,
        SharedModule,
        NativeScriptUIListViewModule
        //DayActionsModule
    ],

    schemas: [
            NO_ERRORS_SCHEMA
        ],
})

export class MoodlogsModule {

}
