import type { KeyboardSystem } from "../../keyboard";
import type { PointerSystem } from "../../pointer";
import type { InputSystem } from "../../types";

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