import type { SoundEffects } from "../types";

/**
 * WEB SFX implementation
 */
export class WebAudioEffects implements SoundEffects {
    private readonly _audioContext: AudioContext;
    private readonly _sounds: Map<string, AudioBuffer> = new Map();
    private readonly _gainNodes: Map<string, GainNode> = new Map();

    constructor(ctx: AudioContext) {
        this._audioContext = ctx;
    }

    public play(name: string): void {
        if (!this._sounds.has(name)) {
            throw new Error(`sfx ${name} is not loaded`);
        }

        const buffer = this._sounds.get(name)!;
        const source = this._audioContext.createBufferSource();
        source.buffer = buffer;
        const gainNode = this._gainNodes.get(name)!;
        source.connect(gainNode).connect(this._audioContext.destination);
        source.start();
    }

    public async preload(src: string, key: string): Promise<void> {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await this._audioContext.decodeAudioData(arrayBuffer)
        this._sounds.set(key, buffer);
    }

    public setVolume(name: string, volume: number): void {
        const gainNode = this._gainNodes.get(name);
        if (gainNode) {
            gainNode.gain.setValueAtTime(volume, this._audioContext.currentTime);
        }
    }
}