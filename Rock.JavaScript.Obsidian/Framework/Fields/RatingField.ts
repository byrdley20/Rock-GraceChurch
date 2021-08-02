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
import { defineComponent } from 'vue';
import { Guid } from '../Util/Guid';
import { registerFieldType, getFieldTypeProps } from './Index';
import { toNumber, toNumberOrNull } from '@Obsidian/Services/Number';
import Rating from '../Elements/Rating';

const fieldTypeGuid: Guid = '24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862';

enum ConfigurationValueKey {
    MaxRating = "max"
}

export default registerFieldType(fieldTypeGuid, defineComponent({
    name: 'RatingField',

    components: {
        Rating
    },

    props: getFieldTypeProps(),

    data() {
        return {
            /** The current rating value. */
            internalValue: 0
        };
    },

    computed: {
        /** The display value. */
        displayValue(): string {
            const value = toNumber(this.modelValue || '');
            let html = "";

            for (let i = 0; i < value && i < this.maxRating; i++) {
                html += `<i class="fa fa-rating-selected"></i>`
            }

            for (let i = value; i < this.maxRating; i++) {
                html += `<i class="fa fa-rating-unselected"></i>`
            }

            return html;
        },

        maxRating(): number {
            const maxRatingConfig = this.configurationValues[ConfigurationValueKey.MaxRating];

            return toNumberOrNull(maxRatingConfig?.value) || 5;
        },

    },

    watch: {
        /**
         * Watch for changes to internalValue and emit the new value out to
         * the consuming component.
         */
        internalValue(): void {
            this.$emit('update:modelValue', this.internalValue !== 0 ? this.internalValue.toString() : '');
        },

        /**
         * Watch for changes to modelValue which indicate the component
         * using us has given us a new value to work with.
         */
        modelValue: {
            immediate: true,
            handler(): void {
                this.internalValue = toNumber(this.modelValue || '');
            }
        }
    },
    template: `
<Rating v-if="isEditMode" v-model="internalValue" :maxRating="maxRating" />
<span v-else v-html="displayValue"></span>`
}));
