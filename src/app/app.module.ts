import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { NgxDhis2CustomFormsEntryModule } from "projects/ngx-dhis2-custom-forms-entry/src/public_api";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./app.effects";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { HttpClientModule } from "@angular/common/http";

import { NgxDhis2OrgUnitFilterModule } from "@iapps/ngx-dhis2-org-unit-filter";
import { MAT_LABEL_GLOBAL_OPTIONS } from "@angular/material/core";
import { NgxDhis2HttpClientModule } from "@iapps/ngx-dhis2-http-client";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxDhis2CustomFormsEntryModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: "iapps",
      models: {}
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: "never" } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
