import type { KeyboardSystem } from "./keyboard";
import type { PointerSystem } from "./pointer";

export interface InputSystem {
    readonly pointer: PointerSystem;
    readonly keyboard: KeyboardSystem;
}