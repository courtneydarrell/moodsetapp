import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ActionBarComponent } from "./ui/action-bar/action-bar.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CalendarComponent } from "../moodlogs/calendar/calendar.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LoadingIndicatorComponent } from './ui/loading-indicator/loading-indicator.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { NativescriptBottomNavigationModule} from "nativescript-bottom-navigation/angular";


@NgModule({
    imports: [NativeScriptCommonModule,
             NativeScriptRouterModule,
             NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativescriptBottomNavigationModule,

    ],

    declarations: [ActionBarComponent,
            //CalendarComponent,
            LoadingIndicatorComponent,
                  ],

    exports: [ActionBarComponent,
           // CalendarComponent,
            LoadingIndicatorComponent,
             ],
    schemas: [
                NO_ERRORS_SCHEMA
            ],
})

export class SharedModule {

}
