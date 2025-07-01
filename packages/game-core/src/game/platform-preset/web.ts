import { Game } from "..";
import { WebAudioEffects, WebAudioSystem, WebBackgroundAudio, WebGameTrackAudio } from "../../engine/audio-system/web-audio";
import { WebInputSystem, WebKeyboardSystem, WebPointerSystem } from "../../engine/input-system/drivers/web";
import type { RenderSystem } from "../../engine/render-system";

export type CreateWebEngineProps = {
    targetElement: HTMLElement;
};

/**
 * Create the game engine for WEB
 * @param {CreateWebEngineProps} props Props to create engine
 * @returns {Engine} - WEB game engine.
 */
export function createWebGame(props: CreateWebEngineProps): Game {
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

    const renderer: RenderSystem = null as unknown as RenderSystem;

    const engine = new Game({
        audio: audioSystem,
        input: inputSystem,
        renderer,
    })

    return engine;
}
