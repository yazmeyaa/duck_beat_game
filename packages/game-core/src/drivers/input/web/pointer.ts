import type { PointerState, PointerSystem } from "../../../engine/input-system/pointer";

/**
 * Web PointerSystem implementation
 */
export class WebPointerSystem implements PointerSystem {
    private activePointers: Map<number, PointerState> = new Map();

    constructor(element: HTMLElement) {
        element.addEventListener('pointermove', this.handlePointerMove.bind(this));
        element.addEventListener('pointerdown', this.handlePointerDown.bind(this));
        element.addEventListener('pointerup', this.handlePointerUp.bind(this));
        element.addEventListener('pointercancel', this.handlePointerUp.bind(this));
        element.addEventListener('lostpointercapture', this.handlePointerUp.bind(this));
    }

    private handlePointerUp(event: PointerEvent): void {
        this.activePointers.delete(event.pointerId);
    }

    private handlePointerMove(event: PointerEvent): void {
        const id = event.pointerId;
        const pointer = this.activePointers.get(id);
        if (!pointer) {
            return;
        }

        const newX = event.offsetX;
        const newY = event.offsetY;

        pointer.dx = newX - pointer.x;
        pointer.dy = newY - pointer.y;
        pointer.x = newX;
        pointer.y = newY;
    }

    private handlePointerDown(event: PointerEvent): void {
        if (this.activePointers.has(event.pointerId)) {
            const data = this.activePointers.get(event.pointerId)!;
            if (data.buttonStates.has(event.button)) {
                return;
            }
            data.buttonStates.add(event.button)
            return;
        }

        const data: PointerState = {
            x: event.offsetX,
            y: event.offsetY,
            dx: 0,
            dy: 0,
            buttonStates: new Set([event.button]),
            type: event.pointerType,
        };
        this.activePointers.set(event.pointerId, data);
    }

    public getPointers(): Iterable<PointerState> {
        return this.activePointers.values();
    }

    public isPressed(pointerID: number, button: number): boolean {
        const pointer = this.activePointers.get(pointerID);
        return pointer?.buttonStates.has(button) ?? false;
    }

    public update(): void {
        for (const pointer of this.activePointers.values()) {
            pointer.dx = 0;
            pointer.dy = 0;
        }
    }

}