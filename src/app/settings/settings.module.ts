import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
//import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular'
import { SettingsComponent } from "../settings/settings.component";
import { SharedModule } from "../shared/shared.module";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SettingsRouterModule } from "./settings-router.module";


@NgModule ({
    declarations: [
            SettingsComponent,
        ],

    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptUIListViewModule,
        SettingsRouterModule
    ],

    schemas: [
            NO_ERRORS_SCHEMA
        ],
})

export class SettingsModule {

}
