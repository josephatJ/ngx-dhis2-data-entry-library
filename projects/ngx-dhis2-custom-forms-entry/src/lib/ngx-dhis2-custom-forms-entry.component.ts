import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "ngx-dhis2-custom-forms-entry",
  templateUrl: "./ngx-dhis2-custom-forms-entry.component.html",
  styles: []
})
export class NgxDhis2CustomFormsEntryComponent implements OnInit {
  @Input() htmlCustomForm: any;
  @Input() dataElements: any;
  constructor() {}

  ngOnInit() {}
}
