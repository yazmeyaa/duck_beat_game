import type { Renderable } from "../types";

export interface Scene {
    update(dt: number): void;
    getRenderables(): ReadonlyArray<Renderable>
    onEnter?(): void;
    onExit?(): void;
    init?(): Promise<void> | void;
    dispose?(): void;
}
