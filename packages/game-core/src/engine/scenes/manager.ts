import type { Scene } from "./scene";

export interface SceneManager {
    switchTo(name: string): Promise<void>;
    getCurrent(): Scene;
    register(name: string, factory: SceneFactory): void;
    unload(name: string): void;
}

export type SceneFactory = Promise<Scene> | Scene;