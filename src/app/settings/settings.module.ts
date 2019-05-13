import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SettingsComponent } from "../settings/settings.component";
import { SharedModule } from "../shared/shared.module";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SettingsRouterModule } from "./settings-router.module";
import { LegalComponent } from "./legal/legal.component";


@NgModule ({
    declarations: [
            SettingsComponent,
            LegalComponent
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
