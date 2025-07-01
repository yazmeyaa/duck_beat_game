import { EventManager } from "../core/events"
import { GameScenesManager } from "../engine/scenes/scenes-manager"
import type { AudioSystem } from "../engine/audio-system"
import type { InputSystem } from "../engine/input-system"
import type { RenderSystem } from "../engine/render-system"
import type { SceneManager } from "../engine/scenes"
import type { GameEvents } from "./events"

export type GameConstructor = {
    audio: AudioSystem;
    input: InputSystem;
    renderer: RenderSystem;
}

/**
 * Hearth of game. Top-level class.
 */
export class Game {
    public events: EventManager<GameEvents>
    public scenes: SceneManager
    public audio: AudioSystem;
    public input: InputSystem;
    public renderer: RenderSystem;

    constructor(props: GameConstructor) {
        this.audio = props.audio;
        this.input = props.input;
        this.renderer = props.renderer;
        this.events = new EventManager<GameEvents>();
        this.scenes = new GameScenesManager(this);
    }
}

