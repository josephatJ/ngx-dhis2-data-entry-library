import * as _ from "lodash";

function getSanitizedValue(value, type) {
  switch (type) {
    case "TRUE_ONLY":
      return convertToBoolean(value);
    default:
      return value;
  }
}

function convertToBoolean(stringValue) {
  return stringValue === "true" ? Boolean(true) : stringValue;
}

function getSelectInput(id, value, options) {
  const selectElement = document.createElement("select");
  selectElement.setAttribute("id", id);
  selectElement.setAttribute("class", "entryselect");

  const defaultOption = document.createElement("option");
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.value = "";
  selectElement.appendChild(defaultOption);

  options.forEach(function(option) {
    const optionElement = document.createElement("option");
    optionElement.value = option.code;
    optionElement.appendChild(document.createTextNode(option.name));
    optionElement;
    if (option.code === value) {
      optionElement.selected = true;
    }

    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

function getTextArea(id, value) {
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", id);
  textarea.setAttribute("name", "entryform");
  textarea.setAttribute("class", "entryfield");
  textarea.value = value;
  return textarea;
}

function getRadioInputs(id, savedValue) {
  const radioContainer = document.createElement("div");

  if (savedValue == "true") {
    const yesInput = document.createElement("input");
    yesInput.setAttribute("type", "radio");
    yesInput.setAttribute("id", id);
    yesInput.setAttribute("name", id);
    yesInput.setAttribute("class", "entryfield-radio");
    yesInput.checked = true;
    yesInput.value = "true";

    const noInput = document.createElement("input");
    noInput.setAttribute("type", "radio");
    noInput.setAttribute("id", id);
    noInput.setAttribute("name", id);
    noInput.setAttribute("class", "entryfield-radio");
    noInput.value = "false";

    radioContainer.appendChild(yesInput);
    radioContainer.appendChild(document.createTextNode(" Yes"));

    radioContainer.appendChild(noInput);
    radioContainer.appendChild(document.createTextNode(" No"));
  } else if (savedValue == "false") {
    const yesInput = document.createElement("input");
    yesInput.setAttribute("type", "radio");
    yesInput.setAttribute("name", id);
    yesInput.setAttribute("id", id);
    yesInput.setAttribute("class", "entryfield-radio");
    yesInput.value = "true";

    const noInput = document.createElement("input");
    noInput.setAttribute("type", "radio");
    noInput.setAttribute("name", id);
    noInput.setAttribute("id", id);
    noInput.setAttribute("class", "entryfield-radio");
    noInput.checked = true;
    noInput.value = "false";

    radioContainer.appendChild(yesInput);
    radioContainer.appendChild(document.createTextNode(" Yes"));

    radioContainer.appendChild(noInput);
    radioContainer.appendChild(document.createTextNode(" No"));
  } else {
    const yesInput = document.createElement("input");
    yesInput.setAttribute("type", "radio");
    yesInput.setAttribute("id", id);
    yesInput.setAttribute("name", id);
    yesInput.setAttribute("class", "entryfield-radio");
    yesInput.value = "true";

    const noInput = document.createElement("input");
    noInput.setAttribute("type", "radio");
    noInput.setAttribute("id", id);
    noInput.setAttribute("name", id);
    noInput.setAttribute("class", "entryfield-radio");
    noInput.value = "false";

    radioContainer.appendChild(yesInput);
    radioContainer.appendChild(document.createTextNode(" Yes"));

    radioContainer.appendChild(noInput);
    radioContainer.appendChild(document.createTextNode(" No"));
  }

  return radioContainer;
}

export function updateFormFieldColor(elementId, statusColor) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.borderColor = statusColor;
  }
}

function getDataValue(data, id) {
  var dataObject = data[id];
  return dataObject ? dataObject.value : "";
}

export function onFormReady(
  dataElements,
  formType,
  dataValues,
  entryFormStatusColors,
  formReadyFunc
) {
  // Find input items and set required properties to them
  const dataElementObjects = _.keyBy(dataElements, "id");
  const inputElements: any = document.getElementsByTagName("INPUT");
  const elementsWithOptionSet = {};
  const elementsWithTextArea = {};
  const elementsWithRadioInput = {};
  _.each(inputElements, (inputElement: any) => {
    if (inputElement) {
      //empty value set on design inputs
      if (inputElement && inputElement.hasAttribute("value")) {
        inputElement.setAttribute("value", "");
      }
      // Get attribute from the element
      const elementId = inputElement.getAttribute("id")
        ? inputElement.getAttribute("id")
        : inputElement.getAttribute("attributeid");

      // Get splitted ID to get data element and category combo ids
      const splitedId =
        formType === "aggregate" || formType === "event"
          ? elementId
            ? elementId.split("-")
            : []
          : [];

      const dataElementId = formType === "event" ? splitedId[1] : splitedId[0];

      const optionComboId =
        formType === "event"
          ? "dataElement"
          : formType === "tracker"
          ? "trackedEntityAttribute"
          : splitedId[1];

      // // Get data element details

      const dataElementDetails = dataElementObjects[dataElementId]
        ? dataElementObjects[dataElementId]
        : {};

      // // Get dataElement type
      const dataElementType = dataElementDetails
        ? dataElementDetails.valueType
        : null;

      // // Get element value
      const dataElementValue = getSanitizedValue(
        getDataValue(dataValues, dataElementId + "-" + optionComboId),
        dataElementType
      );
      // // Update DOM based on data element type
      if (dataElementType) {
        if (dataElementDetails.optionSet) {
          const selectInput = getSelectInput(
            elementId,
            dataElementValue,
            dataElementDetails.optionSet.options
          );
          elementsWithOptionSet[elementId] = selectInput;
        } else {
          if (dataElementType === "TRUE_ONLY") {
            inputElement.setAttribute("type", "checkbox");
            inputElement.setAttribute("class", "entrytrueonly");
            inputElement.checked = dataElementValue;
          } else if (dataElementType === "LONG_TEXT") {
            elementsWithTextArea[elementId] = getTextArea(
              elementId,
              dataElementValue
            );
          } else if (dataElementType === "DATE") {
            inputElement.setAttribute("type", "date");
            inputElement.setAttribute("class", "entryfield");
            inputElement.value = dataElementValue;
          } else if (dataElementType === "BOOLEAN") {
            elementsWithRadioInput[elementId] = getRadioInputs(
              elementId,
              dataElementValue
            );
          } else if (
            dataElementType === "PERCENTAGE" ||
            dataElementType === "NUMBER" ||
            dataElementType.indexOf("INTEGER") > -1
          ) {
            inputElement.setAttribute("type", "number");
            inputElement.setAttribute("class", "entryfield");
            if (dataElementType === "INTEGER_POSITIVE") {
              inputElement.setAttribute("min", 1);
            } else if (dataElementType === "INTEGER_NEGATIVE") {
              inputElement.setAttribute("max", -1);
            } else if (dataElementType === "INTEGER_ZERO_OR_POSITIVE") {
              inputElement.setAttribute("min", 0);
            } else if (dataElementType === "PERCENTAGE") {
              inputElement.setAttribute("min", 0);
              inputElement.setAttribute("max", 100);
            }
            inputElement.value = dataElementValue;
          } else {
            inputElement.setAttribute("class", "entryfield");
            inputElement.value = dataElementValue;
          }
        }
      } else {
        // TODO Find ways to deal with input that
        if (
          inputElement &&
          inputElement.hasAttribute("name") &&
          inputElement.getAttribute("name") === "indicator"
        ) {
          inputElement.setAttribute("value", "0");
          inputElement.setAttribute("class", "entryfield");
          inputElement.setAttribute("readonly", "readonly");
          inputElement.setAttribute("disabled", "disabled");
        }
      }
    }
  });

  // update option sets
  for (let elementId of Object.keys(elementsWithOptionSet)) {
    try {
      const inputElement: any = document.getElementById(elementId);
      const selectInput = elementsWithOptionSet[elementId];
      inputElement.replaceWith(selectInput);
    } catch (error) {
      console.log(JSON.stringify({ type: "Select input", error }));
    }
  }

  // update option sets
  for (let elementId of Object.keys(elementsWithRadioInput)) {
    try {
      const inputElement: any = document.getElementById(elementId);
      const redioInput = elementsWithRadioInput[elementId];
      inputElement.replaceWith(redioInput);
    } catch (error) {
      console.log(JSON.stringify({ type: "Radio input", error }));
    }
  }

  // update text area
  for (let elementId of Object.keys(elementsWithTextArea)) {
    try {
      const inputElement: any = document.getElementById(elementId);
      const textAreaInput = elementsWithTextArea[elementId];
      inputElement.replaceWith(textAreaInput, inputElement);
      inputElement.parentNode.removeChild(inputElement);
    } catch (error) {
      console.log(JSON.stringify({ type: "Text area input", error }));
    }
  }
  const returnedFormFuncObject = formReadyFunc(formType, entryFormStatusColors);
  // console.log("returnedFormFuncObject", returnedFormFuncObject);
  return returnedFormFuncObject;
}

export function onDataValueChange(
  element: any,
  entryFormType: string,
  entryFormColors: any
) {
  console.log("element --> ", element);
  // console.log("colors", entryFormColors);
  return {
    element: { id: element.id },
    formType: entryFormType,
    colors: entryFormColors
  };
}
