import { NgModule } from '@angular/core';
import { NgxDhis2CustomFormsEntryComponent } from './ngx-dhis2-custom-forms-entry.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';

@NgModule({
  declarations: [NgxDhis2CustomFormsEntryComponent, CustomFormComponent],
  imports: [
  ],
  exports: [NgxDhis2CustomFormsEntryComponent]
})
export class NgxDhis2CustomFormsEntryModule { }
