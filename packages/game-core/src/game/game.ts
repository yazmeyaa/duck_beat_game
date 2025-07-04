import { EventManager } from "../core/events"
import { GameScenesManager } from "../engine/scenes/scenes-manager"
import type { AudioSystem } from "../engine/audio-system"
import type { InputSystem } from "../engine/input-system"
import type { RenderSystem } from "../engine/render-system"
import type { SceneManager } from "../engine/scenes"
import type { GameEvents } from "./events"
import type { ResourceManager } from "../engine/resources"
import { Timer } from "../core/timer"

export type GameConstructor = {
    audio: AudioSystem;
    input: InputSystem;
    renderer: RenderSystem;
    resources: ResourceManager;
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
    public resources: ResourceManager
    public globalTimer: Timer

    constructor(props: GameConstructor) {
        this.audio = props.audio;
        this.input = props.input;
        this.renderer = props.renderer;
        this.events = new EventManager<GameEvents>();
        this.scenes = new GameScenesManager(this);
        this.resources = props.resources;
        this.globalTimer = new Timer();
    }

    public async init(): Promise<void> {
        await Promise.all([
            this.renderer.init(),
        ])
    }

    public update(dt: number): void {
        this.globalTimer.update(dt);
        this.scenes.update(dt);
        this.input.keyboard.update();
        this.input.pointer.update();
        for (const renderable of this.scenes.getCurrent().getRenderables()) {
            this.renderer.renderNode(renderable);
        }
    }
}

