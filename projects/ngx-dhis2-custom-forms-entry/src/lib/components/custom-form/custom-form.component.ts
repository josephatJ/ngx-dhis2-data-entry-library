import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import * as _ from "lodash";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import {
  onFormReady,
  onDataValueChange,
  updateFormFieldColor
} from "../../helpers/custom-form.helpers";

@Component({
  selector: "ngx-custom-form",
  templateUrl: "./custom-form.component.html",
  styleUrls: ["./custom-form.component.scss"]
})
export class CustomFormComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() customFormDesign: any;
  @Input() dataElements: any;
  @Output()
  onCustomFormInputChange = new EventEmitter();
  @Input() statusUpdateOnDomElement: any;
  @Input() formType: string;
  _htmlMarkup: SafeHtml;
  entryFormStatusColors: any = {};
  constructor(private sanitizer: DomSanitizer) {
    this.entryFormStatusColors = {
      OK: "#32db64",
      WAIT: "#fffe8c",
      ERROR: "#ff8a8a",
      ACTIVE: "#488aff",
      NORMAL: "#ccc"
    };
    document.body.addEventListener(
      "dataValueUpdate",
      (e: CustomEvent) => {
        e.stopPropagation();
        const dataValueObject = e.detail;
        if (dataValueObject) {
          this.onCustomFormInputChange.emit(dataValueObject);
        }
      },
      false
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  ngOnInit() {
    try {
      this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
        this.customFormDesign
      );
    } catch (e) {
      console.log("ng on init " + JSON.stringify(e));
    }
  }

  ngDoCheck() {
    if (
      this.statusUpdateOnDomElement &&
      this.statusUpdateOnDomElement.id != ""
    ) {
      _.each(this.statusUpdateOnDomElement, element => {
        updateFormFieldColor(
          element.domElementId,
          this.entryFormStatusColors[element.status]
        );
      });
    }
  }

  ngAfterViewInit() {
    try {
      this.setScriptsOnHtmlContent(
        this.getScriptsContents(this.customFormDesign)
      );
    } catch (error) {
      console.log("ng after view int " + JSON.stringify(error));
    }
  }

  setScriptsOnHtmlContent(scripts) {
    const dataValues = [
      { id: "wty765Tyr5A", value: "6666" },
      { id: "zwkm4wGMlrr", value: "" },
      { id: "jTLT0cmQQ6z", value: "test" }
    ];
    onFormReady(
      this.dataElements,
      this.formType,
      dataValues,
      this.entryFormStatusColors,
      function(entryFormType, entryFormStatusColors) {
        // Listen for change event
        document.addEventListener(
          "change",
          function(event: any) {
            // If the clicked element doesn't have the right selector, bail
            if (
              event.target.matches(
                ".entryfield, .entryselect, .entrytrueonly, .entryfileresource, .entryfield-radio"
              ) ||
              event.target.id.length > 10
            ) {
              onDataValueChange(
                event.target,
                entryFormType,
                entryFormStatusColors
              );
            }
            event.preventDefault();
          },
          false
        );

        // Embed inline javascripts
        const scriptsContents = `
          try {${scripts.join("")}} catch(e) { console.log(e);}`;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = scriptsContents;
        document.getElementById(`_custom_entry_form_`).appendChild(script);
      }
    );
  }

  getScriptsContents(html) {
    const matchedScriptArray = html.match(
      /<script[^>]*>([\w|\W]*)<\/script>/im
    );

    const scripts =
      matchedScriptArray && matchedScriptArray.length > 0
        ? matchedScriptArray[0]
            .replace(/(<([^>]+)>)/gi, ":separator:")
            .split(":separator:")
            .filter(content => content.length > 0)
        : [];

    return _.filter(scripts, (scriptContent: string) => scriptContent !== "");
  }
}
