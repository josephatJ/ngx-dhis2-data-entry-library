import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxDhis2CustomFormsEntryModule } from "projects/ngx-dhis2-custom-forms-entry/src/public_api";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxDhis2CustomFormsEntryModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}