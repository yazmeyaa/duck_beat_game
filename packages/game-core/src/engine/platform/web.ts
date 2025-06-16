import { WebAudioEffects, WebAudioSystem, WebBackgroundAudio, WebGameTrackAudio } from "../audio-system/web-audio";
import { Engine } from "../engine";

/**
 * Create the game engine for WEB
 * @returns {Engine} - WEB game engine.
 */
export function createWebEngine(): Engine {
    const audioContext = new AudioContext();
    const sfx = new WebAudioEffects(audioContext);
    const bg = new WebBackgroundAudio(audioContext);
    const track = new WebGameTrackAudio(audioContext);

    const audioSystem = new WebAudioSystem({ audioContext, sfx, bg, track })
    const engine = new Engine({
        audio: audioSystem,
    })

    return engine;
}