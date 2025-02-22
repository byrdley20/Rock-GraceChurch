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
import { defineComponent, PropType } from "vue";
import { useStore } from "../Store/index";

const store = useStore();

export default defineComponent({
    name: "PrimaryBlock",
    props: {
        hideSecondaryBlocks: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    methods: {
        setAreSecondaryBlocksShown(isVisible: boolean): void {
            store.setAreSecondaryBlocksShown(isVisible);
        }
    },
    watch: {
        hideSecondaryBlocks() {
            this.setAreSecondaryBlocksShown(!this.hideSecondaryBlocks);
        }
    },
    template: `<slot />`
});
