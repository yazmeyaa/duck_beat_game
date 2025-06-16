import type { AudioSystem } from "./audio-system";

export type EngineConstructor = {
    audio: AudioSystem;
}

/**
 * Game engine.
 */
export class Engine {
    public audio: AudioSystem;

    constructor(props: EngineConstructor) {
        this.audio = props.audio;
    }
}