import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { LogEditComponent } from "./log-edit.component";
import { SharedModule } from "~/app/shared/shared.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    declarations: [
        LogEditComponent,
        ],
    imports: [
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        //NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([{
            path: '', component: LogEditComponent
        }])
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})

export class LogEditModule {

}
