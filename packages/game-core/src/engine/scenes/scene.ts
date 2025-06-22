import type { Renderable } from "../render-system";

export interface Scene {
    update(dt: number): void;
    getRenderables(): ReadonlyArray<Renderable>
    onEnter?(): void;
    onExit?(): void;
    init?(): Promise<void> | void;
    dispose?(): void;
}
