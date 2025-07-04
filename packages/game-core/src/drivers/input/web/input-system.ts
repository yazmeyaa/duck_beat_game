import type { InputSystem } from "../../../engine/input-system";
import type { KeyboardSystem } from "../../../engine/input-system/keyboard";
import type { PointerSystem } from "../../../engine/input-system/pointer";

export type WebInputSystemConstructor = {
    pointer: PointerSystem;
    keyboard: KeyboardSystem;
}

/**
 * WEB InputSystem implementation
 */
export class WebInputSystem implements InputSystem {
    pointer: PointerSystem;
    keyboard: KeyboardSystem;

    constructor(props: WebInputSystemConstructor) {
        this.pointer = props.pointer;
        this.keyboard = props.keyboard;
    }
}