import type { Scene } from "./scene";

export interface SceneManager {
    switchTo(name: string): Promise<void>;
    getCurrent(): Scene;
    register(name: string, factory: SceneFactory): void;
    unload(name: string): void;
    update(dt: number): void;
}

export type SceneFactory = () => Scene | Promise<Scene>;