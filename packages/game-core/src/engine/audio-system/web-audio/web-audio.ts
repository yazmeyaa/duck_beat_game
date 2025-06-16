import type { AudioSystem, BackgroundAudio, GameTrackAudio, SoundEffects } from "../types";

export type WebAudioSystemConstructor = {
    bg: BackgroundAudio;
    sfx: SoundEffects;
    track: GameTrackAudio;
    audioContext: AudioContext;
}

/**
 * Audio systetm implementation for WEB environment (browsers)
 */
export class WebAudioSystem implements AudioSystem {
    public bg: BackgroundAudio;
    public sfx: SoundEffects;
    public track: GameTrackAudio;
    public readonly audioContext: AudioContext;

    constructor(ctor: WebAudioSystemConstructor) {
        this.bg = ctor.bg
        this.sfx = ctor.sfx
        this.track = ctor.track
        this.audioContext = ctor.audioContext
    }

    public async init(): Promise<void> {
        await this.audioContext.resume();
    }
}