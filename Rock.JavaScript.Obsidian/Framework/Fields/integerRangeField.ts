﻿// <copyright>
// Copyright by the Spark Development Network
//
// Licensed under the Rock Community License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.rockrms.com/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
//
import { Component, defineAsyncComponent } from "vue";
import { FieldTypeBase } from "./fieldType";
import { ClientAttributeValue, ClientEditableAttributeValue } from "../ViewModels";
import { toNumberOrNull } from "../Services/number";


// The edit component can be quite large, so load it only as needed.
const editComponent = defineAsyncComponent(async () => {
    return (await import("./integerRangeFieldComponents")).EditComponent;
});

// The configuration component can be quite large, so load it only as needed.
const configurationComponent = defineAsyncComponent(async () => {
    return (await import("./integerRangeFieldComponents")).ConfigurationComponent;
});

/**
 * The field type handler for the Integer Range field.
 */
export class IntegerRangeFieldType extends FieldTypeBase {
    public override updateTextValue(value: ClientEditableAttributeValue): void {
        if (value.value === null || value.value === undefined || value.value === "" || value.value === ",") {
            value.textValue = "";
            return;
        }

        const numbers = value.value.split(",").map(v => toNumberOrNull(v));

        // If there are not two components then it's not valid, or if both
        // components are not numbers then it's not valid.
        if (numbers.length !== 2 || (numbers[0] === null && numbers[1] === null)) {
            value.textValue = "";
            return;
        }

        if (numbers[0] === null) {
            value.textValue = `through ${numbers[1]}`;
        }
        else if (numbers[1] === null) {
            value.textValue = `from ${numbers[0]}`;
        }
        else {
            value.textValue = `${numbers[0]} to ${numbers[1]}`;
        }
    }

    public override getEditComponent(_value: ClientAttributeValue): Component {
        return editComponent;
    }

    public override getConfigurationComponent(): Component {
        return configurationComponent;
    }
}
