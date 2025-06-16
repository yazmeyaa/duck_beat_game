export interface BackgroundAudio {
    load(src: string): Promise<void>
    play(loop?: boolean): void;
    pause(): void;
    stop(): void;
    setVolume(volume: number): void
}

export interface SoundEffects {
    play(name: string): void;
    preload(src: string): Promise<void>;
    setVolume(name: string, volume: number): void;
}

export interface GameTrackAudio {
    load(src: string): Promise<void>;
    play(): void;
    stop(): void;
    pause(): void;
    seek(time: number): void;
    getTime(): number;
    isPlaying(): boolean;
    setVolume(volume: number): void;
}

export interface AudioSystem {
    bg: BackgroundAudio;
    sfx: SoundEffects;
    track: GameTrackAudio;

    init(): Promise<void>
}