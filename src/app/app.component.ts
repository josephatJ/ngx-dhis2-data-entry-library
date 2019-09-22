import { Component } from "@angular/core";
import { OrgUnitFilterConfig } from "@iapps/ngx-dhis2-org-unit-filter";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { Observable } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "data-entry";
  selectedFormReady: boolean = false;
  orgUnitFormsInfo$: Observable<any>;
  selectedForm: any;
  orgUnitObject: any;
  action: string;
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false
  };
  selectedOrgUnitItems: any[] = [{ id: "O6uvpzGd5pu", name: "Bo", level: 2 }];
  dataElements = [
    { id: "wty765Tyr5A", name: "testing data element", code: "code" }
  ];
  formType: string = "event";
  htmlCustomForm: any =
    '</div><style type="text/css">.main-header{\r\n\t\tbackground-color:#ececec;\r\n\t\t}\r\n\t.sub-header{\r\n\t\tbackground-color:#C3E5FB;\r\n\t\t}\r\n\ttd input {\r\n    display: block;\r\n    width: 100%;\r\n    height: 34px;\r\n    padding: 6px 12px;\r\n    font-size: 14px;\r\n    line-height: 1.428571429;\r\n    color: #555;\r\n    vertical-align: middle;\r\n    background-color: #fff;\r\n    background-image: none;\r\n    border: 1px solid #ccc;\r\n    border-radius: 4px;\r\n    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);\r\n    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);\r\n    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n}\r\n</style>\r\n<div class="cde" id="opd">\r\n<p style="color:red;font-weight:bold;"></p>\r\n\r\n<p style="color:blue;"></b></p>\r\n\r\n<table class="table table-condensed table-bordered table-responsive">\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th class="main-header" colspan="4">Testing custom form (DHIS2 format)</th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody>\r\n\t\t<tr class="sub-header">\r\n\t\t\t<td>D</td>\r\n\t\t\t<td colspan="3">Readness</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>D.1</td>\r\n\t\t\t<td>Staffing Levels</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-zwkm4wGMlrr-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>D.2</td>\r\n\t\t\t<td>Staff Training</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-Y1Q5K7OrSch-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>D.3</td>\r\n\t\t\t<td>Malaria Reference Materials</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-QWltsvPDvKS-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>D.4</td>\r\n\t\t\t<td>Essential Equipment</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-aOMLA15sIQc-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>D.5</td>\r\n\t\t\t<td>Info. System Tools</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-YfOS6bFy6J9-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr class="sub-header">\r\n\t\t\t<td>E</td>\r\n\t\t\t<td colspan="3">Clinical Management</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>&lt; 5 Yrs of age</td>\r\n\t\t\t<td>&gt;= 5 Yrs of age</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>E.1</td>\r\n\t\t\t<td>Clinical History</td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-r47QTTBv3EW-val" class="entryfield" title="" value="" /></td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-Q0fBebucpVa-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>E.2</td>\r\n\t\t\t<td>Physical Exam</td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-RX0gg67sb3h-val" class="entryfield" title="" value="" /></td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-jy5SOEbzvy2-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>E.3</td>\r\n\t\t\t<td>Malaria Testing</td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-fUTMMutaFre-val" class="entryfield" title="" value="" /></td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-Bo6v8jPmHVp-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>E.4</td>\r\n\t\t\t<td>Diagnosis</td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-hiPMcBA3bIY-val" class="entryfield" title="" value="" /></td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-ixL7EU84pOz-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>E.5</td>\r\n\t\t\t<td>Treatment</td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-lo09AHn3srK-val" class="entryfield" title="" value="" /></td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-ROjc4ffbf8E-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>E.6</td>\r\n\t\t\t<td>Patient Counselling</td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-Nr1vY0nQZZ4-val" class="entryfield" title="" value="" /></td>\r\n\t\t\t<td><input id="jTLT0cmQQ6z-GUfFNZo4mB4-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr class="sub-header">\r\n\t\t\t<td>F</td>\r\n\t\t\t<td colspan="3">Patient Satisfaction</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>F.1</td>\r\n\t\t\t<td>Patient Satisfaction</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-i64LsnZiDoX-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr class="sub-header">\r\n\t\t\t<td>G</td>\r\n\t\t\t<td colspan="3">DQA</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G1</td>\r\n\t\t\t<td>DQA Reporting Performance</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-iO5Bgm1YLej-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G2</td>\r\n\t\t\t<td>DQA Readiness</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-GZeIXh1Ktcg-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G3</td>\r\n\t\t\t<td>DQA Consistency Check</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-SoxiEKgM9F7-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G4.1</td>\r\n\t\t\t<td>Malaria Testing Vs Febrile Cases</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-IayZujBNLt5-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G4.2</td>\r\n\t\t\t<td>Diagnosis Matches Test Results</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-TiGkoKjsGsA-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G4.3</td>\r\n\t\t\t<td>ACT Treatment Matches Malaria Diagnosis</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-EaXQ0AbAj5k-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G4.4</td>\r\n\t\t\t<td>ACT Treatment Matches Malaria Test Result</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-XG5fOT6af5a-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>G4</td>\r\n\t\t\t<td>Sample Register Review</td>\r\n\t\t\t<td colspan="2"><input id="jTLT0cmQQ6z-Hk22CYWTJz4-val" class="entryfield" title="" value="" /></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n</div>\r\n';

  entryFormStatusColors = {
    OK: "#32db64",
    WAIT: "#fffe8c",
    ERROR: "#ff8a8a",
    ACTIVE: "#488aff",
    NORMAL: "#ccc"
  };
  statusArr = [];
  statusUpdateOnDomElement = {
    domElementId: "",
    id: "",
    status: ""
  };
  detailsOfTheChangedValue(e) {
    console.log("on your app", e);
    const domElementId = e.domElementId;
    this.statusUpdateOnDomElement.domElementId = e.domElementId;
    this.statusUpdateOnDomElement.id = e.id;
    this.statusUpdateOnDomElement.status = "OK";
    const newObject = {};
    newObject[domElementId] = this.statusUpdateOnDomElement;
    this.statusArr.push(this.statusUpdateOnDomElement);
    setTimeout(function() {
      // this.statusUpdateOnDomElement.domElementId = e.domElementId;
      // this.statusUpdateOnDomElement.id = e.id;
      // this.statusUpdateOnDomElement.status = this.entryFormStatusColors.ACTIVE;
    }, 3000);
  }

  onOrgUnitUpdate(e, action) {
    console.log(action, e);
    this.orgUnitFormsInfo$ = this.httpClient.get(
      "organisationUnits/" +
        e.items[0].id +
        ".json?fields=id,name,dataSets[id,name,dataSetElements[dataElement[id,name,valueType,optionSetValue]],dataEntryForm[id,name,htmlCode]],programs[id,name,programStages[dataEntryForm[*]]]"
    );
  }

  getSelectedForm(selectedFormId) {
    this.orgUnitFormsInfo$.subscribe(info => {
      _.map(info.programs, program => {
        if (program.id == selectedFormId) {
          console.log(program);
          this.htmlCustomForm =
            program["programStages"][0].dataEntryForm.htmlCode;
          this.dataElements = this.getDataElements(
            program["programStages"][0]["programStageDataElements"]
          );
          this.selectedFormReady = true;
        }
      });
    });
  }

  getDataElements(programStageDataElements) {
    let formattedDataElements = [];
    _.map(programStageDataElements, PStageDataElement => {
      formattedDataElements.push(PStageDataElement.dataElement);
    });
    return formattedDataElements;
  }
  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
