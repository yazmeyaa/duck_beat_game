import type { Game } from "../../game";
import type { RenderableNode } from "../render-system";

export interface Scene {
    update(dt: number): void;
    getRenderables(): ReadonlyArray<RenderableNode>
    onEnter?(): void;
    onExit?(): void;
    init(game: Game): Promise<void> | void;
    dispose?(): void;
}
