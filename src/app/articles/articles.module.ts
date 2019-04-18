import { NativeScriptFormsModule, NativeScriptRouterModule } from "nativescript-angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ArticlesComponent } from "./articles.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { SharedModule } from "../shared/shared.module";
import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";

@NgModule({
    declarations: [
        ArticlesComponent,
        ArticleDetailComponent
        ],
    imports: [
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptCommonModule,
        //NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: ArticlesComponent},
            {path: '/article-detail/:id', component: ArticleDetailComponent}])
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})

export class ArticlesModule {

}
