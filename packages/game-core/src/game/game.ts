import type { EventManager } from "../core/events"
import type { SceneManager } from "../core/scene"
import type { Engine } from "../engine/engine"
import type { GameEvents } from "./events"

export type GameConstructor = {
    events: EventManager<GameEvents>
    scenes: SceneManager
    engine: Engine
}

/**
 * Hearth of game. Top-level class.
 */
export class Game {
    public events: EventManager<GameEvents>
    public scenes: SceneManager
    public engine: Engine

    constructor(props: GameConstructor) {
        this.events = props.events;
        this.scenes = props.scenes;
        this.engine = props.engine
    }
}

