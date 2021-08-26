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
import { defineComponent, PropType } from "vue";
import RockFormField from "./rockFormField";

/**
 * A component that provides a rating picker for the user to specify their
 * rating of something.
 */
export default defineComponent({
    name: "Rating",

    components: {
        RockFormField
    },

    /** Defines the read-only properties that are provided by the parent component. */
    props: {
        /** The value provided to use from the parent component. */
        modelValue: {
            type: Number as PropType<number>,
            default: 0
        },

        /** The maximum rating value allowed, this is the number of starts displayed. */
        maxRating: {
            type: Number as PropType<number>,
            default: 5
        }
    },

    /** Defines the read-write properties on this component. */
    data: function () {
        return {
            /** The current value selected by the person. */
            internalValue: this.modelValue,

            /**
             * The current value being hovered by the person or null if no
             * hover operation is happening.
             */
            hoverValue: null as number | null
        };
    },

    /** Methods to define on this instance. */
    methods: {
        /**
         * Set the rating value from an action.
         * 
         * @param value The new rating value.
         */
        setRating(value: number): void {
            this.internalValue = value;
        },

        /**
         * Handles the clear selection event from the person.
         * 
         * @param e The event that triggered this handler.
         * @returns A value indicating if the event has been handled.
         */
        onClear(e: Event): boolean {
            e.preventDefault();

            this.setRating(0);

            return false;
        },

        /**
         * Gets the CSS class to use for the given rating position.
         * 
         * @param position The rating position being queried.
         */
        classForRating(position: number): string {
            const filledCount = Math.min(this.maxRating, this.hoverValue ?? this.internalValue);

            return position <= filledCount ? "fa fa-rating-selected" : "fa fa-rating-unselected";
        },

        /**
         * Sets the current rating position being hovered.
         * 
         * @param position The position being hovered.
         */
        setHover(position: number): void {
            this.hoverValue = position;
        },

        /**
         * Clears any hover rating position value.
         */
        clearHover(): void {
            this.hoverValue = null;
        }
    },

    /** Any read-only property values that get computed automatically. */
    computed: {
    },

    /** Event handlers for when property values change. */
    watch: {
        /**
         * The parent component has given us a new value.
         */
        modelValue() {
            this.internalValue = this.modelValue;
        },

        /**
         * The internal user value has changed, notify the parent component.
         */
        internalValue() {
            this.$emit("update:modelValue", this.internalValue);
        },
    },

    template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-rating"
    name="rock-rating">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="rating-input">
                <i v-for="i in maxRating" :key="i" :class="classForRating(i)" @click="setRating(i)" @mouseover="setHover(i)" @mouseleave="clearHover()"></i>
                <a class="clear-rating" href="#" v-on:click="onClear" @mouseover="setHover(0)" @mouseleave="clearHover()">
                    <span class="fa fa-remove"></span>
                </a>
            </div>
        </div>
    </template>
</RockFormField>
`
});
