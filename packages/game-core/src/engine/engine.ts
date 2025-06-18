import type { AudioSystem } from "./audio-system";
import type { InputSystem } from "./input-system";

export type EngineConstructor = {
    audio: AudioSystem;
    input: InputSystem;
}

/**
 * Game engine.
 */
export class Engine {
    public audio: AudioSystem;
    public input: InputSystem;

    constructor(props: EngineConstructor) {
        this.audio = props.audio;
        this.input = props.input;
    }
}