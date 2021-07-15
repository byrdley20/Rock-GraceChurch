declare module "editorjs-drag-drop" {
    export default class DragDrop {
        protected startBlock: number;

        protected getDropTarget(target: HTMLElement): HTMLElement | null;
        protected getTargetPosition(target: HTMLElement): number;
    }
}
