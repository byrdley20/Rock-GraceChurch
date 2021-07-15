import EditorDragDrop from "editorjs-drag-drop";

/**
 * Custom subclass that fixes a bug with drag/drop when only one block.
 */
export class DragDrop extends EditorDragDrop {
    /**
     * Gets the real drop target element.
     * 
     * @param target The target of the drop operation.
     * @returns The real drop target or null if invalid.
     */
    protected getDropTarget(target: HTMLElement) {
        const block = super.getDropTarget(target);

        /* Bug in editor.js when trying to move block when there is only one
         * block. */
        if (block !== null && super.getTargetPosition(block) === this.startBlock) {
            return null;
        }

        return block;
    }
}
