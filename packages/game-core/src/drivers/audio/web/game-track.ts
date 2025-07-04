import type { GameTrackAudio } from "../../../engine/audio-system";

/**
 * Web GameTrackAudio implementation
 */
export class WebGameTrackAudio implements GameTrackAudio {
    private _audioBuffer: AudioBuffer | null = null;
    private _audioContext: AudioContext;
    private _source: AudioBufferSourceNode | null = null;
    private _isPaused: boolean = false;
    private _gainNode: GainNode;
    private _startTime: number = 0;
    private _offset: number = 0;

    constructor(audioContext: AudioContext) {
        this._audioContext = audioContext;
        this._gainNode = this._audioContext.createGain();
    }
    public setVolume(volume: number): void {
        this._gainNode.gain.setValueAtTime(volume, this._audioContext.currentTime);
    }

    public async load(src: string): Promise<void> {
        const response = await fetch(src);
        const arrayBuff = await response.arrayBuffer();
        this._audioBuffer = await this._audioContext.decodeAudioData(arrayBuff);
    }

    public play(): void {
        if (!this._audioBuffer) {
            throw new Error("track is not loaded.")
        }
        if (this._isPaused) {
            this._source = this._audioContext.createBufferSource();
            this._source.buffer = this._audioBuffer;
            this._source.connect(this._gainNode).connect(this._audioContext.destination);
            this._startTime = this._audioContext.currentTime - this._offset;
            this._source.start(0, this._offset);
            this._isPaused = false;
        } else {
            this._source = this._audioContext.createBufferSource();
            this._source.buffer = this._audioBuffer;
            this._source.connect(this._gainNode).connect(this._audioContext.destination);
            this._startTime = this._audioContext.currentTime;
            this._offset = 0;
            this._source.start();
        }
    }

    public stop(): void {
        if (!this._source) return;
        this._source.stop();
        this._source = null;
        this._offset = 0;
        this._isPaused = false;
    }

    public pause(): void {
        if (!this._source) return;

        this._offset = this._audioContext.currentTime - this._startTime;
        this._source?.stop();
        this._source = null;
        this._isPaused = true;
    }

    public seek(time: number): void {
        if (!this._audioBuffer) throw new Error('track is not loaded');
        const wasPlaying = this.isPlaying();
        if (this._source) {
            this._source.stop();
            this._source = null;
        }
        this._offset = time;
        if (wasPlaying) {
            this._source = this._audioContext.createBufferSource();
            this._source.buffer = this._audioBuffer;
            this._source.connect(this._audioContext.destination);
            this._startTime = this._audioContext.currentTime - time;
            this._source.start(0, time);
            this._isPaused = false;
        }
    }

    public getTime(): number {
        return this._audioContext.currentTime;
    }

    public isPlaying(): boolean {
        return !this._isPaused
    }

}