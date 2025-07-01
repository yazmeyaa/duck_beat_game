import type { Game } from "../..";
import type { RenderableNode } from "../../../engine/render-system";
import type { Scene } from "../../../engine/scenes";

/**
 * Scene where player will hit the notes by bit
 */
export class PlayTrackScene implements Scene {
    update(dt: number): void {
        throw new Error("Method not implemented.");
    }
    getRenderables(): ReadonlyArray<RenderableNode> {
        throw new Error("Method not implemented.");
    }
    init(game: Game): Promise<void> | void {
        throw new Error("Method not implemented.");
    }
}