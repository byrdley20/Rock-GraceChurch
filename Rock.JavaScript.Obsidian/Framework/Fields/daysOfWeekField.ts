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
import { DayOfWeek } from "./dayOfWeekField";


// The edit component can be quite large, so load it only as needed.
const editComponent = defineAsyncComponent(async () => {
    return (await import("./daysOfWeekFieldComponents")).EditComponent;
});

// The configuration component can be quite large, so load it only as needed.
const configurationComponent = defineAsyncComponent(async () => {
    return (await import("./daysOfWeekFieldComponents")).ConfigurationComponent;
});

/**
 * The field type handler for the DaysOfWeek field.
 */
export class DaysOfWeekFieldType extends FieldTypeBase {
    public override updateTextValue(value: ClientEditableAttributeValue): void {
        if (value.value === null || value.value === undefined || value.value === "") {
            value.textValue = "";
            return;
        }

        value.textValue = value.value.split(",")
            .map(v => {
                const dayValue = toNumberOrNull(v);

                if (dayValue === null) {
                    return "";
                }
                else {
                    switch (dayValue) {
                        case DayOfWeek.Sunday:
                            return "Sunday";

                        case DayOfWeek.Monday:
                            return "Monday";

                        case DayOfWeek.Tuesday:
                            return "Tuesday";

                        case DayOfWeek.Wednesday:
                            return "Wednesday";

                        case DayOfWeek.Thursday:
                            return "Thursday";

                        case DayOfWeek.Friday:
                            return "Friday";

                        case DayOfWeek.Saturday:
                            return "Saturday";

                        default:
                            return "";
                    }
                }
            })
            .filter(v => v != "")
            .join(", ");
    }

    public override getEditComponent(_value: ClientAttributeValue): Component {
        return editComponent;
    }

    public override getConfigurationComponent(): Component {
        return configurationComponent;
    }
}
