// <copyright>
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


export type AddressFieldValue = {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
};

// The edit component can be quite large, so load it only as needed.
const editComponent = defineAsyncComponent(async () => {
    return (await import("./addressFieldComponents")).EditComponent;
});

// The configuration component can be quite large, so load it only as needed.
const configurationComponent = defineAsyncComponent(async () => {
    return (await import("./addressFieldComponents")).ConfigurationComponent;
});

/**
 * The field type handler for the Address field.
 */
export class AddressFieldType extends FieldTypeBase {
    public override updateTextValue(value: ClientEditableAttributeValue): void {
        try {
            const addressValue = JSON.parse(value.value || "{}") as AddressFieldValue;
            let textValue = `${addressValue.street1 ?? ""} ${addressValue.street2 ?? ""} ${addressValue.city ?? ""}, ${addressValue.state ?? ""} ${addressValue.postalCode ?? ""}`;

            textValue = textValue.replace(/  +/, " ");
            textValue = textValue.replace(/^ +/, "");
            textValue = textValue.replace(/ +$/, "");

            if (textValue === ",") {
                value.textValue = "";
            }
            else {
                value.textValue = textValue;
            }
        }
        catch {
            value.textValue = value.value;
        }
    }

    public override getEditComponent(_value: ClientAttributeValue): Component {
        return editComponent;
    }

    public override getConfigurationComponent(): Component {
        return configurationComponent;
    }
}
