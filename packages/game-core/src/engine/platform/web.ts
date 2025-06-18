import { WebAudioEffects, WebAudioSystem, WebBackgroundAudio, WebGameTrackAudio } from "../audio-system/web-audio";
import { Engine } from "../engine";
import { WebInputSystem, WebKeyboardSystem, WebPointerSystem } from "../input-system/drivers/web";

export type CreateWebEngineProps = {
    targetElement: HTMLElement;
};

/**
 * Create the game engine for WEB
 * @param {CreateWebEngineProps} props Props to create engine
 * @returns {Engine} - WEB game engine.
 */
export function createWebEngine(props: CreateWebEngineProps): Engine {
    /*__________________AUDIO______________________ */
    const audioContext = new AudioContext();
    const sfx = new WebAudioEffects(audioContext);
    const bg = new WebBackgroundAudio(audioContext);
    const track = new WebGameTrackAudio(audioContext);

    const audioSystem = new WebAudioSystem({ audioContext, sfx, bg, track })
    /*_____________________________________________ */

    /*__________________INPUT______________________ */
    const element = props.targetElement;
    const keyboard = new WebKeyboardSystem();
    const pointer = new WebPointerSystem(element);
    const inputSystem = new WebInputSystem({ keyboard, pointer })
    /*_____________________________________________ */

    const engine = new Engine({
        audio: audioSystem,
        input: inputSystem,
    })

    return engine;
}
