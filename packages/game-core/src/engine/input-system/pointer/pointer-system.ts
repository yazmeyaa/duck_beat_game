export type PointerState = {
    type: string;
    x: number;
    y: number;
    dx: number;
    dy: number;
    buttonStates: Set<number>;
}

export interface PointerSystem {
    getPointers(): Iterable<PointerState>;
    isPressed(pointerID: number, button: number): boolean;
    update(): void;
}