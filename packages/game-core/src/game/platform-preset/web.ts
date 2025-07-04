import { Game } from "..";
import { WebAudioEffects, WebAudioSystem, WebBackgroundAudio, WebGameTrackAudio } from "../../drivers/audio/web";
import { WebInputSystem, WebKeyboardSystem, WebPointerSystem } from "../../drivers/input/web";
import { PixiTextureFactory } from "../../drivers/render/pixi/pixi-texture-factory";
import { PixiRenderSystem } from "../../drivers/render/pixi/render-system";
import { WebResourceManager } from "../../drivers/resources/web/resource-manager";

export type CreateWebEngineProps = {
    targetElement: HTMLCanvasElement;
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

    const renderer = new PixiRenderSystem(props.targetElement);
    const pixiTextureFactory = new PixiTextureFactory();

    const resources = new WebResourceManager(audioContext, pixiTextureFactory);

    const game = new Game({
        audio: audioSystem,
        input: inputSystem,
        renderer,
        resources
    })

    return game;
}
