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

import { Directive } from "vue";
import { loadJavaScriptAsync } from "../Util/page";

const dragulaScriptPromise = loadJavaScriptAsync("/Scripts/dragula.min.js", () => window.dragula !== undefined);

/**
 * The options that can be used when defining a drag source for a drag and
 * drop operation.
 */
export interface IDragSourceOptions {
    /**
     * The unique identifier for this drag drop connection. This should match
     * the id used for drag targets.
     */
    id: string;

    /**
     * Defines the query selector that specifies which elements may act as drag
     * handles. By default all elements are allowed. This value will be ignored
     * if you defined a value for canStartDrag.
     */
    handleSelector?: string;

    /**
     * true if elements are duplicated and instead of the original being moved.
     */
    copyElement?: boolean | ((operation: DragOperation) => boolean);

    /**
     * Function that returns true if the element can start dragging.
     */
    startDrag?: (operation: DragOperation, handle: Element) => boolean;

    /**
     * Function that returns true if the element being dragged can be dropped
     * on the target.
     */
    acceptDrop?: (operation: DragOperation) => boolean;

    /**
     * Called when a drag operation has successfully started. "element" is the element
     * being dragged. "source" is the container that it originally came from.
     */
    dragBegin?: (operation: DragOperation) => void;

    /**
     * Called when a drag operation has ended for any reason. "element" is the element
     * that was being dragged.
     */
    dragEnd?: (operation: DragOperation) => void;

    /**
     * Called when a drag operation has successfully completed. "element" is the
     * element that was dropped. "target" is the container that it was dropped
     * onto. "source" is the container it originally came from. "sibling" is the
     * element it was dropped before, or undefined if it was dropped in the last
     * position.
     */
    dragDrop?: (operation: DragOperation) => void;

    /**
     * Called when the drag operation was cancelled, usually because it was dropped
     * outside of a valid container. "element" is the element that was dragged.
     * "lastContainer" is the last valid container it where "element" went back
     * to. "source" is the original container it came from.
     */
    dragCancel?: (operation: DragOperation) => void;

    /**
     * Called when a drag operation has moved over the specified valid target
     * container. "element" is the element being dragged. "target" is the container
     * the operation is currently hovering over. "source" is the container it
     * originally came from.
     */
    dragOver?: (operation: DragOperation) => void;

    /**
     * Called when a drag operation has moved out of the specified container (or
     * was dropped into it). "element" is the element being dragged. "target"
     * is the container it has left or was dropped into. "source" is the container
     * it originally came from.
     */
    dragOut?: (operation: DragOperation) => void;
}

/**
 * The options that can be used when defining a drag target for a drag and
 * drop operation.
 */
export interface IDragTargetOptions {
    id: string;
}

/**
 * Allows for an association between an element and the options it was
 * initialized with.
 */
type ElementOptions<T> = {
    /** The element associated with the options. */
    element: Element;

    /** The options associated with the element. */
    options: T;
};

/**
 * Details about a drag operation that is in progress.
 */
export type DragOperation = {
    /** The element that is being dragged. */
    element: Element;

    /** The container that the element is originally from. */
    sourceContainer: Element;

    /** The index position in the sourceContainer for the element. */
    sourceIndex: number;

    /** The next sibling after the element before the drag operation started. */
    sourceSibling?: Element;

    /** The target container the element is hovering over or being dropped into. */
    targetContainer?: Element;

    /** The index position in the targetContainer. */
    targetIndex?: number;

    /** The next sibling the element is hovering or being dropped before. */
    targetSibling?: Element;
};

/**
 * Service to handle drag and drop operations between two containers. The
 * service describes the path for the drag and drop operation. Each service
 * can have multiple source containers and multiple target containers. A
 * source container should only ever associated with a single service but
 * a target container can be associated with multiple services.
 */
class DragDropService {
    /** The unique identifier of this service path. Recommended as a Guid. */
    public readonly id: string;

    /** The underlying drake object that will handle the drag and drop feature. */
    private drake: dragula.Drake;

    /** The source containers and their initialization options. */
    private sourceContainers: ElementOptions<IDragSourceOptions>[] = [];

    /** The target containers and their initialization options. */
    private targetContainers: ElementOptions<IDragTargetOptions>[] = [];

    /** The internal drag operation that is currently in progress. */
    private internalOperation?: DragOperation;

    /**
     * Creates a new instance of the DragDropService class.
     * 
     * @param identifier The unique identifier of this service.
     */
    constructor(identifier: string) {
        this.id = identifier;
        this.drake = window.dragula([], {
            accepts: this.drakeAccepts.bind(this),
            copy: this.drakeCopy.bind(this),
            moves: this.drakeMoves.bind(this),
            revertOnSpill: true
        });

        this.drake.on("drag", this.drakeEventDrag.bind(this));
        this.drake.on("drop", this.drakeEventDrop.bind(this));
        this.drake.on("over", this.drakeEventOver.bind(this));
        this.drake.on("out", this.drakeEventOut.bind(this));
        this.drake.on("cancel", this.drakeEventCancel.bind(this));
        this.drake.on("dragend", this.drakeEventEnd.bind(this));
    }

    /**
     * Checks if this service is considered finished and can be destroyed.
     *
     * @returns true if this service is finished and has no reason to live.
     */
    public isFinished(): boolean {
        return this.sourceContainers.length === 0 && this.targetContainers.length === 0;
    }

    /**
     * Destroys the service and prepares everything for disposal.
     */
    public destroy(): void {
        this.drake.destroy();
    }

    /**
     * Adds a new source container to the service.
     *
     * @param container The container that will begin drags.
     * @param options Additional options that provide operational context to the source.
     */
    public addSourceContainer(container: Element, options: IDragSourceOptions): void {
        const containerIndex = this.sourceContainers.findIndex(c => c.element === container);

        if (containerIndex === -1) {
            this.sourceContainers.push({
                element: container,
                options: options
            });
        }

        this.updateDrakeContainers();
    }

    /**
     * Adds a new target container to the service.
     * 
     * @param container The container that will accept drops.
     * @param options Additional options that provide operational context to the target.
     */
    public addTargetContainer(container: Element, options: IDragTargetOptions): void {
        const containerIndex = this.targetContainers.findIndex(c => c.element === container);

        if (containerIndex === -1) {
            this.targetContainers.push({
                element: container,
                options: options
            });
        }

        this.updateDrakeContainers();
    }

    /**
     * Remove a source container that will no longer begin drag operations.
     * 
     * @param container The container that will be removed.
     */
    public removeSourceContainer(container: Element): void {
        const containerIndex = this.sourceContainers.findIndex(c => c.element === container);

        if (containerIndex !== -1) {
            this.sourceContainers.splice(containerIndex, 1);
        }

        this.updateDrakeContainers();
    }

    /**
     * Remove a target container that will no longer accept drop operations.
     * 
     * @param container The container that will be removed.
     */
    public removeTargetContainer(container: Element): void {
        const containerIndex = this.targetContainers.findIndex(c => c.element === container);

        if (containerIndex !== -1) {
            this.targetContainers.splice(containerIndex, 1);
        }

        this.updateDrakeContainers();
    }

    /**
     * Updates the containers on the drake object with the current list of
     * containers from both the source and target lists.
     */
    private updateDrakeContainers(): void {
        this.drake.containers = this.sourceContainers.map(c => c.element)
            .concat(...this.targetContainers.map(c => c.element));
    }

    // #region Dragula Event Handlers

    /**
     * Determines if an element should be copied or moved. This is called
     * after dragula has decided the element can be dragged but before the drag
     * event is triggered.
     * 
     * @param el The element that is about to be dragged.
     * @param container The container that contains the element.
     *
     * @returns true if the element should be copied; otherwise false.
     */
    private drakeCopy(el: Element, container: Element): boolean {
        const elementOptions = this.sourceContainers.find(c => c.element === container);

        // Check if the user has a custom copyElement handler.
        if (elementOptions?.options.copyElement !== undefined) {
            if (typeof elementOptions.options.copyElement === "function") {
                const sourceIndex = Array.from(container.children).indexOf(el);

                return elementOptions.options.copyElement({
                    element: el,
                    sourceContainer: container,
                    sourceIndex: sourceIndex,
                    sourceSibling: el.nextElementSibling ?? undefined
                });
            }
            else {
                return elementOptions.options.copyElement;
            }
        }

        return false;
    }

    /**
     * Determines if an element is allowed to be dragged.
     * 
     * @param el The element that would be moved or copied out of the container.
     * @param container The source container for the operation.
     * @param handle The element the user is currently interacting with.
     * @param sibling The next sibling to the element that will be dragged.
     */
    private drakeMoves(el?: Element, container?: Element, handle?: Element, sibling?: Element | null): boolean {
        if (!el || !container || !handle) {
            return false;
        }

        const elementOptions = this.sourceContainers.find(c => c.element === container);

        // No options found means this isn't a source container.
        if (!elementOptions) {
            return false;
        }

        // User has defined their own custom logic to determine if a drag
        // operation can begin.
        if (elementOptions.options.startDrag) {
            const sourceIndex = Array.from(container.children).indexOf(el);

            return elementOptions.options.startDrag({
                element: el,
                sourceContainer: container,
                sourceIndex,
                sourceSibling: sibling ?? undefined
            }, handle);
        }

        // No canStartDrag defined. Use default behavior. Check if they defined
        // a handleSelector value and use that to see if the handle is valid.
        if (elementOptions.options.handleSelector) {
            return Array.from(container.querySelectorAll(elementOptions.options.handleSelector)).includes(handle);
        }

        // Default is to always allow drag.
        return true;
    }

    /**
     * Checks if the target container will accept the element as a drop.
     * 
     * @param el The element being dragged.
     * @param target The target container being considered for the drop operation.
     * @param source The source container the element came from.
     * @param sibling The next sibling of the element in the target container.
     *
     * @returns true if the element will be accepted into the target.
     */
    private drakeAccepts(el?: Element, target?: Element, source?: Element, sibling?: Element | null): boolean {
        if (!el || !source || !target) {
            return false;
        }

        const sourceOptions = this.sourceContainers.find(c => c.element === source);
        const targetOptions = this.targetContainers.find(c => c.element === target);

        // No sourceOptions found means this isn't a valid source container.
        // No targetOptions found means this isn't a valid target container.
        if (!sourceOptions || !targetOptions || !this.internalOperation) {
            return false;
        }

        // Dragula sometimes returns the shadow object being placed and
        // sometimes the sibling. Make sure we get a real sibling.
        const realSibling = sibling && sibling.classList.contains("gu-transit") ? sibling.nextElementSibling : sibling;
        const targetIndex = realSibling ? Array.from(target.children).indexOf(realSibling) - 1 : target.children.length - 1;

        // Give the parent container a chance to decide if the drop is valid.
        if (sourceOptions.options.acceptDrop !== undefined) {
            return sourceOptions.options.acceptDrop({
                ...this.internalOperation,
                targetContainer: target,
                targetIndex,
                targetSibling: realSibling ?? undefined
            });
        }

        return true;
    }

    /**
     * Notification that a drag operation has begun.
     * 
     * @param el The element that is now being dragged by the user.
     * @param source The source container the element came from.
     */
    private drakeEventDrag(el: Element, source: Element): void {
        const sourceIndex = Array.from(source.children).indexOf(el);

        this.internalOperation = {
            element: el,
            sourceContainer: source,
            sourceIndex,
            sourceSibling: el.nextElementSibling ?? undefined
        };

        const sourceOptions = this.sourceContainers.find(c => c.element === source);

        // No sourceOptions found means this isn't a valid source container.
        if (!sourceOptions) {
            return;
        }

        if (sourceOptions.options.dragBegin) {
            sourceOptions.options.dragBegin({
                ...this.internalOperation
            });
        }
    }

    /**
     * Notification that a drag operation has completed and the element dropped
     * into a new container.
     * 
     * @param el The element that was dropped.
     * @param target The target container the element was dropped into.
     * @param source The source container the element came from.
     * @param sibling The next sibling of the element in the target container.
     */
    private drakeEventDrop(el: Element, target: Element, source: Element, sibling?: Element | null): void {
        const sourceOptions = this.sourceContainers.find(c => c.element === source);
        const targetOptions = this.targetContainers.find(c => c.element === target);

        // No sourceOptions found means this isn't a valid source container.
        // No targetOptions found means this isn't a valid target container.
        if (!sourceOptions || !targetOptions || !this.internalOperation) {
            return;
        }

        const targetIndex = Array.from(target.children).indexOf(el);

        if (sourceOptions.options.dragDrop) {
            sourceOptions.options.dragDrop({
                ...this.internalOperation,
                targetContainer: target,
                targetIndex,
                targetSibling: sibling ?? undefined
            });
        }
    }

    /**
     * Notification that the drag operation was cancelled, usually this means
     * the element was dropped outside a valid target container.
     * 
     * @param el The element that is no longer being dragged.
     * @param lastContainer The last valid container the element is being returned to.
     * @param source The source container the element came from.
     */
    private drakeEventCancel(el: Element, lastContainer: Element, source: Element): void {
        const sourceOptions = this.sourceContainers.find(c => c.element === source);

        // No sourceOptions found means this isn't a valid source container.
        if (!sourceOptions || !this.internalOperation) {
            return;
        }

        if (sourceOptions.options.dragCancel) {
            sourceOptions.options.dragCancel({
                ...this.internalOperation
            });
        }
    }

    /**
     * Notification that the drag operation is now hovering over a target
     * container. This is only called if true is returned from drakeAccepts.
     * 
     * @param el The element that is being dragged.
     * @param target The target container being hovered over.
     * @param source The source container the element came from.
     */
    private drakeEventOver(el: Element, target: Element, source: Element): void {
        const sourceOptions = this.sourceContainers.find(c => c.element === source);
        const targetOptions = this.targetContainers.find(c => c.element === target);

        // No sourceOptions found means this isn't a valid source container.
        // No targetOptions found means this isn't a valid target container.
        if (!sourceOptions || !targetOptions || !this.internalOperation) {
            return;
        }

        if (sourceOptions.options.dragOver) {
            sourceOptions.options.dragOver({
                ...this.internalOperation,
                targetContainer: target
            });
        }
    }

    /**
     * Notification that the drag operation has moved out of the specified
     * target container.
     * 
     * @param el The element being dragged.
     * @param target The target container the operation just moved out of.
     * @param source The source container the element came from.
     */
    private drakeEventOut(el: Element, target: Element, source: Element): void {
        const sourceOptions = this.sourceContainers.find(c => c.element === source);
        const targetOptions = this.targetContainers.find(c => c.element === target);

        // No sourceOptions found means this isn't a valid source container.
        // No targetOptions found means this isn't a valid target container.
        if (!sourceOptions || !targetOptions || !this.internalOperation) {
            return;
        }

        if (sourceOptions.options.dragOut) {
            sourceOptions.options.dragOut({
                ...this.internalOperation,
                targetContainer: target
            });
        }
    }

    /**
     * Notification that the drag operation has ended. This is called no matter
     * what reason caused the end.
     * 
     * @param el The element that was being dragged.
     */
    private drakeEventEnd(el: Element): void {
        const sourceOptions = this.sourceContainers.find(c => c.element === this.internalOperation?.sourceContainer);

        // No sourceOptions found means this isn't a valid source container.
        if (!sourceOptions || !this.internalOperation || this.internalOperation.element !== el) {
            return;
        }

        if (sourceOptions.options.dragEnd) {
            sourceOptions.options.dragEnd({
                ...this.internalOperation
            });
        }
    }

    // #endregion
}

/**
 * The known drag and drop services that are currently in use on the page.
 */
const knownServices: Record<string, DragDropService> = {};

/**
 * Gets an existing DragDropService for the given identifier.
 * 
 * @param identifier The identifier of the service to be retrieved.
 *
 * @returns The DragDropService or undefined if it was not found.
 */
function getExistingDragDropService(identifier: string): DragDropService | undefined {
    return knownServices[identifier];
}

/**
 * Gets a DragDropService for the given identifier, creating it if necessary.
 * 
 * @param identifier The identifier of the service to be retrieved.
 *
 * @returns The DragDropService for the identifier.
 */
function getDragDropService(identifier: string): DragDropService {
    if (knownServices[identifier]) {
        return knownServices[identifier];
    }

    const service = new DragDropService(identifier);

    knownServices[identifier] = service;

    return service;
}

/**
 * Destroys a DragDropService and removes it from the known list of services.
 * 
 * @param service The service to be destroyed.
 */
function destroyService(service: DragDropService): void {
    service.destroy();
    delete knownServices[service.id];
}

/**
 * Defines the source of a drag and drop operation.
 *
 * When using a v-for to display the items, ensure you use a unique :key. Otherwise
 * when you .splice() after a drop weird things will happen.
 */
export const DragSource: Directive<HTMLElement, IDragSourceOptions> = {
    mounted(element, binding) {
        if (!binding.value || !binding.value.id) {
            console.error("DragSource must have a valid identifier.");
            return;
        }

        dragulaScriptPromise.then(() => {
            const service = getDragDropService(binding.value.id);

            service.addSourceContainer(element, binding.value);
        });
    },

    unmounted(element, binding) {
        if (!binding.value || !binding.value.id) {
            return;
        }

        const service = getExistingDragDropService(binding.value.id);

        if (service) {
            service.removeSourceContainer(element);

            if (service.isFinished()) {
                destroyService(service);
            }
        }
    }
};

/**
 * Defines the target of a drag and drop operation.
 *
 * When using a v-for to display the items, ensure you use a unique :key. Otherwise
 * when you .splice() after a drop weird things will happen.
 */
export const DragTarget: Directive<HTMLElement, IDragTargetOptions> = {
    mounted(element, binding) {
        if (!binding.value || !binding.value.id) {
            console.error("DragTarget must have a valid identifier.");
            return;
        }

        dragulaScriptPromise.then(() => {
            const service = getDragDropService(binding.value.id);

            service.addTargetContainer(element, binding.value);
        });
    },

    unmounted(element, binding) {
        if (!binding.value || !binding.value.id) {
            return;
        }

        const service = getExistingDragDropService(binding.value.id);

        if (service) {
            service.removeTargetContainer(element);

            if (service.isFinished()) {
                destroyService(service);
            }
        }
    }
};
